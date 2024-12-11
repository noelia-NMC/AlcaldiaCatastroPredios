from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Models.transaccion import TransaccionDB
from Models.usuario import UsuarioDB
from database import SessionLocal
from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import aliased

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/api/transacciones", tags=["transacciones"])
def listar_transacciones(
    fechaInicio: Optional[str] = None,
    fechaFin: Optional[str] = None,
    idUsuario: Optional[int] = None,
    db: Session = Depends(get_db),
):
    query = db.query(TransaccionDB)

    # Filtrar por fecha de inicio y fin
    if fechaInicio:
        try:
            fecha_inicio_dt = datetime.fromisoformat(fechaInicio)
            query = query.filter(TransaccionDB.FechaHora >= fecha_inicio_dt)
        except ValueError:
            raise HTTPException(status_code=400, detail="Formato de fechaInicio inválido")

    if fechaFin:
        try:
            fecha_fin_dt = datetime.fromisoformat(fechaFin)
            query = query.filter(TransaccionDB.FechaHora <= fecha_fin_dt)
        except ValueError:
            raise HTTPException(status_code=400, detail="Formato de fechaFin inválido")

    if idUsuario:
        query = query.filter(TransaccionDB.IDUsuario == idUsuario)

    # Traer datos con nombres de usuarios
    transacciones = query.all()

    return [
        {
            "IDTransaccion": t.IDTransaccion,
            "IDUsuario": t.IDUsuario,
            "NombreUsuario": db.query(UsuarioDB.Nombre).filter(UsuarioDB.IDUsuario == t.IDUsuario).scalar(),
            "FechaHora": t.FechaHora,
            "TipoAccion": t.TipoAccion,
            "Descripcion": t.Descripcion,
            "EntidadAfectada": t.EntidadAfectada,
            "IDEntidadAfectada": t.IDEntidadAfectada,
        }
        for t in transacciones
    ]


@router.get("/api/transacciones/{transaccion_id}", tags=["transacciones"])
def obtener_transaccion(transaccion_id: int, db: Session = Depends(get_db)):
    """
    Obtiene los detalles de una transacción específica.
    """
    transaccion = db.query(TransaccionDB).filter(TransaccionDB.IDTransaccion == transaccion_id).first()
    if not transaccion:
        raise HTTPException(status_code=404, detail="Transacción no encontrada")
    return transaccion
