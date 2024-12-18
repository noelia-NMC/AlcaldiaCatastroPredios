import { url } from "./http";

// Obtener todos los roles
export const fetchRoles = async () => {
    const response = await fetch(`${url}roles/`);
    if (!response.ok) {
        throw new Error('Error al obtener roles');
    }
    return response.json();
};

// Obtener un rol por ID
export const fetchRol = async (id) => {
    const response = await fetch(`${url}roles/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el rol');
    }
    return response.json();
};

// Crear un nuevo rol
export const createRol = async (id_u, rol) => {
    const { NombreRol, Estado, Permisos } = rol;

    const rolData = {
        NombreRol,
        Estado: Boolean(Estado),
        Permisos: Array.isArray(Permisos) ? Permisos.map(p => String(p)) : [], // Asegúrate de que sea un array
    };

    const response = await fetch(`${url}${id_u}/roles/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rolData),
    });

    console.log(rolData);  // Verifica que todos los campos requeridos estén aquí

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detallado desde el backend:", errorData);
        throw new Error(errorData.detail || 'Error al crear el rol');
    }

    return response.json();
};


// Actualizar un rol existente
export const updateRol = async (id_u, id, rol) => {
    const response = await fetch(`${url}${id_u}/roles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rol),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detallado desde el backend:", errorData);
        throw new Error(errorData.detail || 'Error al crear el rol');
    }
    

    return response.json();
};


// Eliminar un rol
export const deleteRol = async (id_u, id) => {
    const response = await fetch(`${url}${id_u}/roles/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el rol');
    }
    return response.status === 204 ? {} : response.json();
};
