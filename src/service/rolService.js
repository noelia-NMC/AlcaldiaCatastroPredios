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
      Permisos: Permisos.map(p => String(p)),
    };
  
    const response = await fetch(`${url}${id_u}/roles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rolData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error detallado desde el backend:", errorData.detail);
      if (errorData.detail) {
        errorData.detail.forEach((err) => {
          console.log(`Campo con error: ${err.loc.join('.')} - Mensaje: ${err.msg}`);
        });
      }
      throw new Error(errorData.detail.map(err => err.msg).join(" | ") || 'Error al crear el rol');
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
        throw new Error(errorData.message || 'Error al actualizar el rol');
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
