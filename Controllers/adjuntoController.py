from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Annotated
from Models.adjuntos import Adjuntos, AdjuntosDB, Adjuntosform  # Modelo de Pydantic y SQLAlchemy
from Models.predio import PredioDB
from Models.transaccion import TransaccionDB
from database import SessionLocal
import os
import shutil
from datetime import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/api/adjuntos/", response_model=List[Adjuntos], tags=["adjuntos"])
def listar_adjuntos(db: Session = Depends(get_db)):
    return db.query(AdjuntosDB).all()

@router.get("/api/adjuntos/{adjunto_id}", response_model=Adjuntos, tags=["adjuntos"])
def seleccionar_adjunto(adjunto_id: int, db: Session = Depends(get_db)):
    adjunto = db.query(AdjuntosDB).filter(AdjuntosDB.IdAdjuntos == adjunto_id).first()
    if adjunto is None:
        raise HTTPException(status_code=404, detail="Adjunto no encontrado")
    return adjunto


# API para añadir adjunto
@router.post("/api/{id_u}/adjuntos/", response_model=Adjuntos, tags=["adjuntos"])
async def añadir_adjunto(id_u: int, adjunto: Annotated[Adjuntosform, File()],
                         db: Session = Depends(get_db)):
    try:
        predio = db.query(PredioDB).filter(PredioDB.IdPredio == adjunto.IdPredio).first()
        if not predio:
            raise HTTPException(status_code=404, detail="Predio no encontrado")

        db_adjunto = AdjuntosDB(**adjunto.dict(exclude={"IdAdjuntos", "file"}))

        # Guarda el archivo en una ruta específica
        file_extension = adjunto.file.filename.split(".")[-1]
        path = f"{predio.Ruta}"
        if os.path.exists(path):
            # Listar todos los archivos en el directorio
            archivos = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
            cantidad_archivos = len(archivos) + 1
            db_adjunto.NumAdjunto = cantidad_archivos
            db_adjunto.Tipo = file_extension
        else:
            raise HTTPException(status_code=400, detail=f"La ruta '{path}' no existe.")

        file_location = os.path.join(path, f"{cantidad_archivos}.{file_extension}")

        # Guardar el archivo físicamente
        with open(file_location, "wb") as f:
            shutil.copyfileobj(adjunto.file.file, f)

        # Guardar el adjunto en la base de datos
        db.add(db_adjunto)
        db.commit()  # Confirmar el adjunto
        db.refresh(db_adjunto)

        # Registrar la transacción de añadir adjunto
        db_transaccion = TransaccionDB(
            IDUsuario=id_u,  # El usuario que realiza la acción
            FechaHora=datetime.now(),
            TipoAccion="Añadir adjunto",  # Tipo de acción
            Descripcion=f"El usuario {id_u} añadió un adjunto al predio con ID {adjunto.IdPredio}.",  # Descripción
            EntidadAfectada="Adjunto",  # La entidad afectada
            IDEntidadAfectada=db_adjunto.IdAdjuntos  # El ID del nuevo adjunto
        )

        # Agregar la transacción
        db.add(db_transaccion)
        db.commit()  # Confirmar la transacción



        return db_adjunto
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al añadir adjunto: {str(e)}")


# API para editar adjunto
@router.put("/api/{id_u}/adjuntos/{adjunto_id}", response_model=Adjuntos, tags=["adjuntos"])
def editar_adjunto(id_u: int, adjunto_id: int, adjunto_actualizado: Adjuntos, db: Session = Depends(get_db)):
    adjunto = db.query(AdjuntosDB).filter(AdjuntosDB.IdAdjuntos == adjunto_id).first()
    if adjunto is None:
        raise HTTPException(status_code=404, detail="Adjunto no encontrado")

    # Actualizar el adjunto
    for key, value in adjunto_actualizado.dict(exclude={"IdAdjunto"}).items():
        setattr(adjunto, key, value)

    # Registrar la transacción de editar adjunto
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Editar adjunto",  # Tipo de acción
        Descripcion=f"El usuario {id_u} editó el adjunto con ID {adjunto_id}.",  # Descripción
        EntidadAfectada="Adjunto",  # La entidad afectada
        IDEntidadAfectada=adjunto_id  # El ID del adjunto editado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Confirmar los cambios en el adjunto
    db.commit()
    db.refresh(adjunto)

    return adjunto


# API para eliminar adjunto
@router.delete("/api/{id_u}/adjuntos/{adjunto_id}", tags=["adjuntos"])
def eliminar_adjunto(id_u: int, adjunto_id: int, db: Session = Depends(get_db)):
    adjunto = db.query(AdjuntosDB).filter(AdjuntosDB.IdAdjuntos == adjunto_id).first()
    if adjunto is None:
        raise HTTPException(status_code=404, detail="Adjunto no encontrado")

    predio = db.query(PredioDB).filter(PredioDB.IdPredio == adjunto.IdPredio).first()
    if not predio:
        raise HTTPException(status_code=404, detail="Predio no encontrado")

    path = f"{predio.Ruta}/{adjunto.NumAdjunto}.{adjunto.Tipo}"

    # Eliminar el archivo del sistema de archivos
    try:
        os.remove(path)
        print(f"Archivo '{path}' eliminado con éxito.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar el archivo: {str(e)}")

    # Registrar la transacción de eliminar adjunto
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El usuario que realiza la acción
        FechaHora=datetime.now(),
        TipoAccion="Eliminar adjunto",  # Tipo de acción
        Descripcion=f"El usuario {id_u} eliminó el adjunto con ID {adjunto_id} del predio con ID {adjunto.IdPredio}.",
        # Descripción
        EntidadAfectada="Adjunto",  # La entidad afectada
        IDEntidadAfectada=adjunto_id  # El ID del adjunto eliminado
    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción

    # Eliminar el adjunto de la base de datos
    db.delete(adjunto)
    db.commit()  # Confirmar la eliminación

    return {"detail": "Adjunto eliminado", "adjunto": adjunto}
