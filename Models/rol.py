from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import List

Base = declarative_base()


class RolDB(Base):
    __tablename__ = "Rol"

    IdRol = Column(Integer, primary_key=True, index=True)
    NombreRol = Column(String(50), nullable=False)
    Estado = Column(Boolean, default=True, nullable=False)
    Permisos = Column(String, nullable=False)  # Cambiar a tipo adecuado si es necesario


class Rol(BaseModel):
    IdRol: int
    NombreRol: str
    Estado: bool
    Permisos: List[str]

    class Config:
        orm_mode = True
