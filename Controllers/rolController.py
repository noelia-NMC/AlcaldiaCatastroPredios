from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from Models.rol import Rol, RolDB  # Modelo de Pydantic y SQLAlchemy
from Models.transaccion import TransaccionDB
from database import SessionLocal
from datetime import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/api/roles/", response_model=List[Rol], tags=["roles"])
def listar_roles(db: Session = Depends(get_db)):
    return db.query(RolDB).all()

@router.get("/api/roles/{rol_id}", response_model=Rol, tags=["roles"])
def seleccionar_rol(rol_id: int, db: Session = Depends(get_db)):
    rol = db.query(RolDB).filter(RolDB.IdRol == rol_id).first()
    if rol is None:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return rol

@router.post("/api/{id_u}/roles/", response_model=Rol, tags=["roles"])
def añadir_rol(id_u: int, rol: Rol, db: Session = Depends(get_db)):
    # Crear el rol en la base de datos
    db_rol = RolDB(**rol.dict(exclude={"IdRol"}))
    db.add(db_rol)
    db.commit()
    db.refresh(db_rol)  # Refrescar el objeto para tener el ID recién generado

    # Registrar la transacción para la creación del rol
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El ID del usuario que realiza la acción
        FechaHora=datetime.now(),  # La fecha y hora de la acción
        TipoAccion="Añadir rol",  # El tipo de acción
        Descripcion=f"El usuario {id_u} creó un nuevo rol: {rol.NombreRol}.",  # Descripción detallada
        EntidadAfectada="Rol",  # La entidad afectada
        IDEntidadAfectada=db_rol.IdRol  # El ID del nuevo rol creado
    )

    # Agregar la transacción a la base de datos
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Devolver el rol recién creado
    return db_rol

# API para editar rol
@router.put("/api/{id_u}/roles/{rol_id}", response_model=Rol, tags=["roles"])
def editar_rol(id_u: int, rol_id: int, rol_actualizado: Rol, db: Session = Depends(get_db)):
    # Buscar el rol en la base de datos
    rol = db.query(RolDB).filter(RolDB.IdRol == rol_id).first()
    if rol is None:
        raise HTTPException(status_code=404, detail="Rol no encontrado")

    # Actualizar los atributos del rol
    for key, value in rol_actualizado.dict(exclude={"IdRol"}).items():
        setattr(rol, key, value)

    # Registrar la transacción de edición del rol
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Editar rol",  # Tipo de acción: editar rol
        Descripcion=f"El usuario {id_u} editó el rol {rol_id}.",  # Descripción
        EntidadAfectada="Rol",  # La entidad afectada
        IDEntidadAfectada=rol_id  # El ID del rol editado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Confirmar los cambios en el rol
    db.commit()
    db.refresh(rol)  # Asegurarse de tener la versión más actual del rol

    return rol


# API para eliminar rol
@router.delete("/api/{id_u}/roles/{rol_id}", tags=["roles"])
def eliminar_rol(id_u: int, rol_id: int, db: Session = Depends(get_db)):
    # Buscar el rol en la base de datos
    rol = db.query(RolDB).filter(RolDB.IdRol == rol_id).first()
    if rol is None:
        raise HTTPException(status_code=404, detail="Rol no encontrado")

    # Registrar la transacción de eliminación del rol
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Eliminar rol",  # Tipo de acción: eliminar rol
        Descripcion=f"El usuario {id_u} eliminó el rol {rol_id}.",  # Descripción
        EntidadAfectada="Rol",  # La entidad afectada
        IDEntidadAfectada=rol_id  # El ID del rol eliminado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Eliminar el rol de la base de datos
    db.delete(rol)
    db.commit()  # Confirmar la eliminación

    return {"detail": "Rol eliminado", "rol": rol}
