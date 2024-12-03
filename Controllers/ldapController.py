from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from ldap3 import Server, Connection, ALL
import json
import os
from typing import List, Optional
import asyncio

router = APIRouter()


class LdapConfig(BaseModel):
    ldap_host: str = Field(..., alias="LdapHost")
    domain_name: str = Field(..., alias="DomainName")
    user: str = Field(..., alias="User")
    password: str = Field(..., alias="Password")
    ldap_port: int = Field(..., alias="LdapPort")


class LDAPData(BaseModel):
    Usuario: str
    PrimerNombre: str
    ApPaterno: str
    ApMaterno: str
    Estado: bool


def load_config():
    appsettings_file = os.path.join(os.getcwd(), "config.json")
    with open(appsettings_file) as f:
        return json.load(f)


@router.get("/usuariosLdap", response_model=List[LDAPData], tags=["ldap"])
async def get_ldap_data():
    ldap_config = load_config()["ConnectionStrings"]["ldap"]
    #print("Configuración LDAP:", ldap_config)  # Para depuración

    # Verificar que el DomainName no sea None
    domain_name = ldap_config.get('DomainName')
    if not domain_name:
        raise HTTPException(status_code=500, detail="El DomainName no está configurado correctamente.")

    server = Server(f"{ldap_config['LdapHost']}:{ldap_config['LdapPort']}", get_info=ALL)

    try:
        user_dn = f"{ldap_config['User']}@{ldap_config['DomainName']}"
        conn = Connection(server, user=user_dn, password=ldap_config['Password'], auto_bind=True)

        conn.search(
            search_base=f"dc={domain_name.split('.')[0]},dc={domain_name.split('.')[1]}",
            search_filter='(objectClass=User)',
            attributes=['sAMAccountName', 'givenName', 'sn', 'userAccountControl']
        )

        if not conn.entries:
            return []  # O maneja la respuesta si no hay usuarios.

        ldap_data_list = []

        for entry in conn.entries:
            if entry.sn:
                ap_paterno, ap_materno = '', ''
                apellido_words = entry.sn.value.split(' ')

                if apellido_words:
                    ap_paterno = apellido_words[0]
                    if len(apellido_words) > 1:
                        ap_materno = apellido_words[1]

                ldap_data = LDAPData(
                    Usuario=entry.sAMAccountName.value,
                    PrimerNombre=entry.givenName.value,
                    ApPaterno=ap_paterno,
                    ApMaterno=ap_materno,
                    Estado=get_user_status(entry.userAccountControl.value)
                )

                # Verificar si el usuario ya existe en la base de datos
                if not await verificar_usuario_existente_en_bd(ldap_data.Usuario):
                    ldap_data_list.append(ldap_data)

        return ldap_data_list
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Error al recuperar los datos LDAP: {ex}")

def get_user_status(user_account_control):
    disabled_flag = 0x0002
    flags = int(user_account_control)
    return (flags & disabled_flag) != disabled_flag


async def verificar_usuario_existente_en_bd(username: str) -> bool:
    # Aquí implementas la verificación en tu base de datos
    # Por ejemplo, usando SQLAlchemy:
    # return await db_session.query(User).filter(User.username == username).count() > 0
    return False  # Cambia esto por tu lógica


@router.get("/VerificarUsuario", tags=["ldap"])
async def verificar_usuario(usuario: str, contraseña: str):
    ldap_config = load_config()["ConnectionStrings"]["ldap"]
    server = Server(f"{ldap_config['LdapHost']}:{ldap_config['LdapPort']}", get_info=ALL)

    if not usuario or not contraseña:
        raise HTTPException(status_code=400, detail="El usuario y la contraseña son obligatorios.")

    try:
        user_dn = f"{ldap_config['User']}@{ldap_config['DomainName']}"
        conn = Connection(server, user=user_dn, password=ldap_config['Password'], auto_bind=True)
        conn.search(f"dc={ldap_config['DomainName'].split('.')[0]},dc={ldap_config['DomainName'].split('.')[1]}",
                    f'(&(objectClass=user)(sAMAccountName={usuario}))')

        if conn.entries:
            user_entry = conn.entries[0]
            user_dn = user_entry.entry_dn

            try:
                user_conn = Connection(server, user=user_dn, password=contraseña, auto_bind=True)
                return {"message": "Usuario y contraseña verificados"}
            except Exception:
                return {"message": "Usuario existente"}
        else:
            return {"message": "El usuario no existe en el servidor LDAP."}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Error al verificar usuario en el servidor LDAP: {ex}")
