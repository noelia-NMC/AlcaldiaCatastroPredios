import { url } from "./http";

// Manejo centralizado de respuestas
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorDetails}`);
    }
    return await response.json();
};

// Obtener las transacciones con filtros
export const fetchTransacciones = async (fechaInicio, fechaFin, idUsuario) => {
    const queryParams = new URLSearchParams();
    if (fechaInicio) queryParams.append("fechaInicio", fechaInicio);
    if (fechaFin) queryParams.append("fechaFin", fechaFin);
    if (idUsuario) queryParams.append("idUsuario", idUsuario);

    try {
        const response = await fetch(`${url}transacciones?${queryParams}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        throw error;
    }
};

// Obtener una transacción por ID
export const fetchTransaccion = async (id) => {
    try {
        const response = await fetch(`${url}transacciones/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al obtener la transacción:", error);
        throw error;
    }
};

// Obtener todos los usuarios
export const fetchUsuarios = async () => {
    try {
        const response = await fetch(`${url}usuarios`);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};