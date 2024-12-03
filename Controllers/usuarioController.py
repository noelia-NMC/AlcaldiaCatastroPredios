# controllers/usuarios.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from Models.usuario import Usuario, UsuarioDB  # Modelo de Pydantic y SQLAlchemy
from Models.transaccion import TransaccionDB
from database import SessionLocal
from datetime import datetime

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/api/usuarios/", response_model=List[Usuario], tags=["usuarios"])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(UsuarioDB).all()


@router.get("/api/usuarios/{usuario_id}", response_model=Usuario, tags=["usuarios"])
def seleccionar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioDB).filter(UsuarioDB.IDUsuario == usuario_id).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario


@router.post("/api/{id_u}/usuarios/", response_model=Usuario, tags=["usuarios"])
def añadir_usuario(id_u: int, usuario: Usuario, db: Session = Depends(get_db)):
    # Crear el objeto db_usuario sin el ID (probablemente autogenerado)
    db_usuario = UsuarioDB(**usuario.dict(exclude={"IDUsuario"}))

    # Añadir el usuario a la base de datos
    db.add(db_usuario)
    db.commit()  # Confirmar la transacción en la base de datos
    db.refresh(db_usuario)  # Obtener el IDUsuario recién generado

    # Crear la transacción de manera más compacta
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,
        FechaHora=datetime.now(),
        TipoAccion="Añadir usuario",
        Descripcion=f"El usuario {id_u} creo un nuevo usuario",
        EntidadAfectada="Usuario",
        IDEntidadAfectada=db_usuario.IDUsuario
    )

    # Añadir la transacción a la base de datos
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción en la base de datos

    # Devolver el usuario recién creado
    return db_usuario


@router.put("/api/{id_u}/usuarios/{usuario_id}", response_model=Usuario, tags=["usuarios"])
def editar_usuario(id_u: int, usuario_id: int, usuario_actualizado: Usuario, db: Session = Depends(get_db)):
    # Obtener el usuario actual desde la base de datos
    usuario = db.query(UsuarioDB).filter(UsuarioDB.IDUsuario == usuario_id).first()

    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Actualizar los atributos del usuario
    for key, value in usuario_actualizado.dict(exclude={"IdAdjunto"}).items():
        setattr(usuario, key, value)

    # Registrar la transacción
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,
        FechaHora=datetime.now(),
        TipoAccion="Editar usuario",
        Descripcion=f"El usuario {usuario_id} actualizó los datos de un usuario.",
        EntidadAfectada="Usuario",
        IDEntidadAfectada=usuario_id
    )

    # Agregar la transacción y el usuario a la base de datos
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción en la base de datos

    # Actualizar el usuario en la base de datos
    db.commit()

    # Devolver el usuario actualizado
    return usuario


@router.delete("/api/{id_u}/usuarios/{usuario_id}", tags=["usuarios"])
def eliminar_usuario(id_u:int, usuario_id: int, db: Session = Depends(get_db)):
    # Obtener el usuario a eliminar desde la base de datos
    usuario = db.query(UsuarioDB).filter(UsuarioDB.IDUsuario == usuario_id).first()

    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Registrar la transacción para la eliminación
    db_transaccion = TransaccionDB(
        IDUsuario=id_u,  # El ID del usuario que realiza la acción (si es el mismo, puede ser usuario_id)
        FechaHora=datetime.now(),  # La fecha y hora de la transacción
        TipoAccion="Eliminar usuario",  # Tipo de acción
        Descripcion=f"El usuario {usuario_id} eliminó el usuario con ID {usuario_id}.",  # Descripción
        EntidadAfectada="Usuario",  # La entidad que se ve afectada
        IDEntidadAfectada=usuario_id  # El ID del usuario eliminado
    )

    # Agregar la transacción a la base de datos
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción en la base de datos

    # Eliminar el usuario
    db.delete(usuario)
    db.commit()  # Confirmar la eliminación del usuario

    # Devolver el mensaje de éxito con el usuario eliminado
    return {"detail": "Usuario eliminado", "usuario": usuario}


# Controlador de login
@router.post("/api/usuarios/login", tags=["usuarios"])
def login(username: str, password: str, db: Session = Depends(get_db)):
    # Buscar al usuario con las credenciales proporcionadas
    usuario = db.query(UsuarioDB).filter(UsuarioDB.Username == username, UsuarioDB.Password == password).first()



    # Si el usuario no existe, lanzar un error
    if usuario is None:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Registrar la transacción de login (ya sea exitoso o fallido)
    db_transaccion = TransaccionDB(
        IDUsuario=usuario.IDUsuario,
        FechaHora=datetime.now(),
        TipoAccion="Login fallido" if usuario is None else "Login exitoso",
        Descripcion=f"login para el usuario {username}.",
        EntidadAfectada="Usuario",
        IDEntidadAfectada=usuario.IDUsuario

    )

    # Agregar la transacción
    db.add(db_transaccion)
    db.commit()  # Confirmar la transacción
    db.refresh(usuario)
    # Devolver los detalles del usuario en caso de login exitoso
    return usuario
