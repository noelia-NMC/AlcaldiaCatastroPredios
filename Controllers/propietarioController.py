from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from Models.propietarios import Propietarios, PropietariosDB  # Modelo de Pydantic y SQLAlchemy
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

@router.get("/api/propietarios/", response_model=List[Propietarios], tags=["propietarios"])
def listar_propietarios(db: Session = Depends(get_db)):
    return db.query(PropietariosDB).all()

@router.get("/api/propietarios/{propietario_id}", response_model=Propietarios, tags=["propietarios"])
def seleccionar_propietario(propietario_id: int, db: Session = Depends(get_db)):
    propietario = db.query(PropietariosDB).filter(PropietariosDB.Ci == propietario_id).first()
    if propietario is None:
        raise HTTPException(status_code=404, detail="Propietario no encontrado")
    return propietario

# API para añadir propietario
@router.post("/api/{id_u}/propietarios/", response_model=Propietarios, tags=["propietarios"])
def añadir_propietario(id_u: int, propietario: Propietarios, db: Session = Depends(get_db)):
    # Crear el propietario en la base de datos
    db_propietario = PropietariosDB(**propietario.dict())
    db.add(db_propietario)
    db.commit()
    db.refresh(db_propietario)  # Refrescar para obtener el ID generado por la DB

    # Registrar la transacción de añadir propietario
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Añadir propietario",  # Tipo de acción
        Descripcion=f"El usuario {id_u} añadió un nuevo propietario con CI {db_propietario.Ci}.",  # Descripción
        EntidadAfectada="Propietario",  # La entidad afectada
        IDEntidadAfectada=db_propietario.Ci  # El CI del nuevo propietario
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    return db_propietario


# API para editar propietario
@router.put("/api/{id_u}/propietarios/{propietario_id}", response_model=Propietarios, tags=["propietarios"])
def editar_propietario(id_u: int, propietario_id: int, propietario_actualizado: Propietarios, db: Session = Depends(get_db)):
    # Buscar el propietario en la base de datos
    propietario = db.query(PropietariosDB).filter(PropietariosDB.Ci == propietario_id).first()
    if propietario is None:
        raise HTTPException(status_code=404, detail="Propietario no encontrado")

    # Guardar los cambios en el propietario
    for key, value in propietario_actualizado.dict().items():
        setattr(propietario, key, value)

    # Registrar la transacción de editar propietario
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Editar propietario",  # Tipo de acción
        Descripcion=f"El usuario {id_u} editó los datos del propietario con CI {propietario_id}.",  # Descripción
        EntidadAfectada="Propietario",  # La entidad afectada
        IDEntidadAfectada=propietario_id  # El CI del propietario editado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Confirmar los cambios
    db.commit()
    db.refresh(propietario)

    return propietario


# API para eliminar propietario
@router.delete("/api/{id_u}/propietarios/{propietario_id}", tags=["propietarios"])
def eliminar_propietario(id_u: int, propietario_id: int, db: Session = Depends(get_db)):
    # Buscar el propietario en la base de datos
    propietario = db.query(PropietariosDB).filter(PropietariosDB.Ci == propietario_id).first()
    if propietario is None:
        raise HTTPException(status_code=404, detail="Propietario no encontrado")

    # Registrar la transacción de eliminar propietario
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Eliminar propietario",  # Tipo de acción
        Descripcion=f"El usuario {id_u} eliminó el propietario con CI {propietario_id}.",  # Descripción
        EntidadAfectada="Propietario",  # La entidad afectada
        IDEntidadAfectada=propietario_id  # El CI del propietario eliminado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Eliminar el propietario de la base de datos
    db.delete(propietario)
    db.commit()  # Confirmar la eliminación

    return {"detail": "Propietario eliminado", "propietario": propietario}