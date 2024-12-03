from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()


class TransaccionDB(Base):
    __tablename__ = "Transaccion"

    IDTransaccion = Column(Integer, primary_key=True, index=True)
    IDUsuario = Column(Integer, nullable=False)
    FechaHora = Column(DateTime, nullable=False)
    TipoAccion = Column(String, nullable=False)
    Descripcion = Column(String, nullable=False)
    EntidadAfectada = Column(String, nullable=False)
    IDEntidadAfectada = Column(Integer, nullable=False)


class Transaccion(BaseModel):
    IDUsuario: int
    FechaHora: str  # Ajustar a tipo adecuado
    TipoAccion: str
    Descripcion: str
    EntidadAfectada: str
    IDEntidadAfectada: int

    class Config:
        orm_mode = True
