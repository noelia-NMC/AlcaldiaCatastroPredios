from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from fastapi import UploadFile, Form

Base = declarative_base()


class AdjuntosDB(Base):
    __tablename__ = "Adjuntos"

    IdAdjuntos = Column(Integer, primary_key=True, index=True)
    IdPredio = Column(Integer, nullable=False)
    NumAdjunto = Column(Integer, nullable=False)
    Tipo = Column(String, nullable=False)


class Adjuntos(BaseModel):
    IdAdjuntos: int
    IdPredio: int
    NumAdjunto: int
    Tipo: str

    class Config:
        orm_mode = True

class Adjuntosform(BaseModel):
    IdPredio: int = Form(...)
    file: UploadFile
