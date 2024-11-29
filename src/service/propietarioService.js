import { url } from "./http";

// Obtener todos los propietarios
export const fetchPropietarios = async () => {
    try {
        const response = await fetch(`${url}propietarios`);
        if (!response.ok) {
            throw new Error('Error al obtener propietarios');
        }
        return response.json();
    } catch (error) {
        console.error('Error en fetchPropietarios:', error);
        throw error; // Propaga el error para manejarlo más arriba si es necesario
    }
};

// Obtener un propietario por CI
export const fetchPropietario = async (ci) => {
    try {
        const response = await fetch(`${url}propietarios/${ci}`);
        if (!response.ok) {
            throw new Error('Error al obtener el propietario');
        }
        return response.json();
    } catch (error) {
        console.error('Error en fetchPropietario:', error);
        throw error;
    }
};

// Crear un nuevo propietario
export const createPropietario = async (propietario) => {
    try {
        console.log('Datos enviados a createPropietario:', propietario); // Para verificar los datos enviados
        const response = await fetch(`${url}propietarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(propietario),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al crear el propietario: ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error en createPropietario:', error);
        throw error;
    }
};


// Actualizar un propietario existente
export const updatePropietario = async (ci, propietario) => {
    try {
        const response = await fetch(`${url}propietarios/${ci}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(propietario)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el propietario');
        }
        return response.status === 204 ? {} : response.json();
    } catch (error) {
        console.error('Error en updatePropietario:', error);
        throw error;
    }
};

// Eliminar un propietario
export const deletePropietario = async (ci) => {
    try {
        const response = await fetch(`${url}propietarios/${ci}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el propietario');
        }
        return response.status === 204 ? {} : response.json();
    } catch (error) {
        console.error('Error en deletePropietario:', error);
        throw error;
    }
};
