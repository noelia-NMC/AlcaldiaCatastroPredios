from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Models.transaccion import TransaccionDB
from database import SessionLocal
from typing import List, Optional
from datetime import datetime

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
    """
    Lista las transacciones con filtros opcionales.
    """
    query = db.query(TransaccionDB)

    # Filtros opcionales
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

    # Ordenar por fecha descendente
    transacciones = query.order_by(TransaccionDB.FechaHora.desc()).all()

    return transacciones


@router.get("/api/transacciones/{transaccion_id}", tags=["transacciones"])
def obtener_transaccion(transaccion_id: int, db: Session = Depends(get_db)):
    """
    Obtiene los detalles de una transacción específica.
    """
    transaccion = db.query(TransaccionDB).filter(TransaccionDB.IDTransaccion == transaccion_id).first()
    if not transaccion:
        raise HTTPException(status_code=404, detail="Transacción no encontrada")
    return transaccion
