from sqlalchemy import Column, BigInteger, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()


class PropietariosDB(Base):
    __tablename__ = "Propietarios"

    Ci = Column(BigInteger, primary_key=True, index=True)
    Nombres = Column(String, nullable=False)
    Appat = Column(String, nullable=False)
    Apmat = Column(String, nullable=False)


class Propietarios(BaseModel):
    Ci: int
    Nombres: str
    Appat: str
    Apmat: str

    class Config:
        orm_mode = True
