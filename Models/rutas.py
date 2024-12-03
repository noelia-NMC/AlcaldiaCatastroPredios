from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()


class RutasDB(Base):
    __tablename__ = "Rutas"

    Id = Column(Integer, primary_key=True, index=True)
    Direccion = Column(String, nullable=False)


class Rutas(BaseModel):
    Id: int
    Direccion: str

    class Config:
        orm_mode = True
