import { url } from "./http";

// Obtener todos los usuarios
export const fetchUsuarios = async () => {
    const response = await fetch(`${url}usuarios/`);
    if (!response.ok) {
        throw new Error('Error al obtener la lista de usuarios.');
    }
    return response.json();
};

// Obtener un usuario por ID
export const fetchUsuario = async (id) => {
    const response = await fetch(`${url}usuarios/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener el usuario con ID: ${id}`);
    }
    return response.json();
};

// Crear un nuevo usuario
export const createUsuario = async (id_u, usuario) => {
    const response = await fetch(`${url}${id_u}/usuarios/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario.');
    }
    return response.json();
};

// Actualizar un usuario existente
export const updateUsuario = async (id_u, id, usuario) => {
    const response = await fetch(`${url}${id_u}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error(`Error al actualizar el usuario con ID: ${id}`);
    }
    return response.status === 204 ? { message: 'Usuario actualizado correctamente.' } : response.json();
};

// Eliminar un usuario
export const deleteUsuario = async (id_u, id) => {
    const response = await fetch(`${url}${id_u}/usuarios/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Error al eliminar el usuario con ID: ${id}`);
    }
    return response.status === 204 ? { message: 'Usuario eliminado correctamente.' } : response.json();
};

// Endpoint para el inicio de sesión
const LOGIN_URL = `${url}usuarios/login`;

// Función para realizar login
export const loginUsuario = async (username, password) => {
    try {
        const response = await fetch(`${LOGIN_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Credenciales incorrectas.');
            } else {
                throw new Error(`Error al iniciar sesión. Código de estado: ${response.status}`);
            }
        }

        return await response.json();
    } catch (error) {
        console.error("Error en loginUsuario:", error);
        throw error;
    }
};
