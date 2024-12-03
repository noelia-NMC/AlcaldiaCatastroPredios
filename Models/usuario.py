# models/usuario.py
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import Optional

Base = declarative_base()


class UsuarioDB(Base):
    __tablename__ = "Usuario"

    IDUsuario = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String, nullable=False)
    Appat = Column(String, nullable=False)
    Apmat = Column(String, nullable=True)
    Username = Column(String, unique=True, index=True)
    Password = Column(String)
    Estado = Column(Boolean, default=True)
    IdRol = Column(Integer, nullable=False)


class Usuario(BaseModel):
    IDUsuario: int
    Nombre: str
    Appat: str
    Apmat: Optional[str] = None
    Username: str
    Password: str
    Estado: bool
    IdRol: int

    class Config:
        orm_mode = True
