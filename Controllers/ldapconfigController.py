from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import json
import os

router = APIRouter()

# Pydantic model for the LDAP configuration
class LdapConfig(BaseModel):
    ldap_host: str = Field(..., alias="LdapHost")
    domain_name: str = Field(..., alias="DomainName")
    user: str = Field(..., alias="User")
    password: str = Field(..., alias="Password")
    ldap_port: int = Field(..., alias="LdapPort")

# Load the current LDAP configuration from the appsettings.json
def load_config():
    appsettings_file = os.path.join(os.getcwd(), "config.json")
    with open(appsettings_file) as f:
        return json.load(f)

# Save the LDAP configuration to the appsettings.json
def save_config(config: LdapConfig):
    appsettings_file = os.path.join(os.getcwd(), "config.json")
    current_config = load_config()

    if "ConnectionStrings" not in current_config:
        current_config["ConnectionStrings"] = {}

    current_config["ConnectionStrings"]["ldap"] = {
        "LdapHost": config.ldap_host,
        "LdapPort": config.ldap_port,
        "DomainName": config.domain_name,
        "User": config.user,
        "Password": config.password,
    }

    with open(appsettings_file, "w") as f:
        json.dump(current_config, f, indent=4)

@router.put("/ActualizarConfiguracion", tags=["ldapconfig"])
async def update_ldap_config(config: LdapConfig):
    # Validación de la configuración LDAP
    if not all([config.ldap_host, config.domain_name, config.user, config.password]) or config.ldap_port <= 0:
        raise HTTPException(status_code=400, detail="Todos los campos son obligatorios y el puerto debe ser un número positivo.")

    # Guardar la nueva configuración LDAP
    save_config(config)
    return {"message": "Configuración LDAP actualizada con éxito."}

@router.get("/ObtenerConfiguracion", tags=["ldapconfig"])
async def get_ldap_config():
    current_config = load_config()
    ldap_config = current_config.get("ConnectionStrings", {}).get("ldap", {})
    return ldap_config
