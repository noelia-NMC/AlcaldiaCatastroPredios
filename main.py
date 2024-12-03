import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controllers.usuarioController import router as usuario_router
from Controllers.adjuntoController import router as adjunto_router
from Controllers.predioController import router as predio_router
from Controllers.propietarioController import router as propietario_router
from Controllers.rolController import router as rol_router
from Controllers.ldapController import router as ldap_router
from Controllers.ldapconfigController import router as ldapconfig_router
from Controllers.transaccionesController import router as transacciones_router

# Cargar la configuración desde el archivo JSON
with open("config.json") as config_file:
    config = json.load(config_file)

# Elegir la conexión adecuada
DATABASE_URL = config["ConnectionStrings"]["defaultConnection"]

app = FastAPI()

# Configuración de CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite orígenes específicos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

app.include_router(usuario_router)
app.include_router(adjunto_router)
app.include_router(predio_router)
app.include_router(propietario_router)
app.include_router(rol_router)
app.include_router(ldap_router)
app.include_router(ldapconfig_router)
app.include_router(transacciones_router)
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
