import { url } from "./http";
import { getCookie } from "../utils/cookies";

// Manejo centralizado de respuestas
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorDetails}`);
    }
    return await response.json();
};

// Función para realizar la solicitud de las transacciones con autenticación
const fetchWithAuth = async (url, options = {}) => {
    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
    };

    // Obtener el token de autenticación de las cookies (si estás usando cookies para el manejo de sesión)
    const authToken = getCookie("auth_token"); 
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`; // Asegúrate de que el backend espere un token en la cabecera Authorization
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: "include", // Incluir cookies en las solicitudes (solo si usas cookies)
    });
};

// Obtener las transacciones, con o sin filtros
export const fetchTransacciones = async (fechaInicio, fechaFin) => {
    const queryParams = new URLSearchParams();
    if (fechaInicio) queryParams.append("fechaInicio", fechaInicio);
    if (fechaFin) queryParams.append("fechaFin", fechaFin);

    try {
        const response = await fetchWithAuth(`${url}transacciones?${queryParams}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al obtener las transacciones:", error);
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
        const response = await fetch(`${url}usuarios/`);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

// Obtener un usuario por ID
export const fetchUsuario = async (id) => {
    const response = await fetch(`${url}usuarios/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener el usuario con ID: ${id}`);
    }
    return response.json();
};