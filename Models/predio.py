from sqlalchemy import Column, Integer, String, Double, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import Optional
from fastapi import Form, UploadFile

Base = declarative_base()


class PredioDB(Base):
    __tablename__ = "Predio"

    IdPredio = Column(Integer, primary_key=True, index=True)
    SubD = Column(Integer, nullable=False)
    Manzano = Column(Integer, nullable=False)
    NumeroPredio = Column(Integer, nullable=False)
    Bloque = Column(Integer, nullable=False)
    UnidadCat = Column(Integer, nullable=False)
    Superficie = Column(Double, nullable=False)
    FechaAprobacion = Column(String, nullable=False)
    DocumentoAprobador = Column(String, nullable=False)
    FechaDocumentoAprobador = Column(String, nullable=False)
    Planta = Column(String, nullable=False)
    Uso = Column(String, nullable=False)
    CodCatastral = Column(String, nullable=False)
    TipoPredio = Column(String, nullable=False)
    Ruta = Column(String, nullable=False)
    IdPropietario = Column(Integer, nullable=False)


class Predio(BaseModel):
    IdPredio: int
    SubD: int
    Manzano: int
    NumeroPredio: int
    Bloque: int
    UnidadCat: int
    Superficie: float
    FechaAprobacion: str
    DocumentoAprobador: str
    FechaDocumentoAprobador: str
    Planta: str
    Uso: str
    CodCatastral: str
    TipoPredio: str
    Ruta: str
    IdPropietario: int

    class Config:
        orm_mode = True

class Predioform(BaseModel):
    SubD: int = Form(...)
    Manzano: int = Form(...)
    NumeroPredio: int = Form(...)
    Bloque: int = Form(...)
    UnidadCat: int = Form(...)
    Superficie: float = Form(...)
    FechaAprobacion: str = Form(...)
    DocumentoAprobador: str = Form(...)
    FechaDocumentoAprobador: str = Form(...)
    Planta: str = Form(...)
    Uso: str = Form(...)
    CodCatastral: str = Form(...)
    TipoPredio: str = Form(...)
    Ruta: Optional[str] = None  # El campo 'ruta' es opcional
    IdPropietario: int = Form(...)
    file: UploadFile
