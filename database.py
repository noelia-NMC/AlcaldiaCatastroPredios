# database/db.py
import json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cargar la configuración desde el archivo JSON
with open("config.json") as config_file:
    config = json.load(config_file)

# Obtener la cadena de conexión
DATABASE_URL = config["ConnectionStrings"]["defaultConnection"]

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear una clase de sesión local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarar una clase base para los modelos
Base = declarative_base()

# Crear las tablas en la base de datos (solo se llama al inicio)
def init_db():
    Base.metadata.create_all(bind=engine)
