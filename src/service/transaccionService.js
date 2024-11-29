import { url } from "./http";

// Obtener las transacciones con los filtros
export const fetchTransacciones = async (fechaInicio, fechaFin, idUsuario) => {
    let queryParams = new URLSearchParams();

    // Formatear fechas en formato ISO
    if (fechaInicio) {
        const fecha = new Date(fechaInicio);
        fecha.setHours(0, 0, 0, 0);
        queryParams.append('fechaInicio', fecha.toISOString());
    }

    if (fechaFin) {
        const fecha = new Date(fechaFin);
        fecha.setHours(23, 59, 59, 999);
        queryParams.append('fechaFin', fecha.toISOString());
    }

    if (idUsuario) {
        queryParams.append('idUsuario', idUsuario);
    }

    try {
        const response = await fetch(`${url}transacciones?${queryParams}`);
        if (!response.ok) {
            throw new Error('Error al obtener transacciones');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Obtener todos los usuarios
export const fetchUsuarios = async () => {
    try {
        const response = await fetch(`${url}Usuarios`);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Obtener una transacción por ID
export const fetchTransaccion = async (id) => {
    try {
        const response = await fetch(`${url}transacciones/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la transacción');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
