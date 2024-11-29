import { url } from "./http";

export const fetchadjuntos = async () => {
    const response = await fetch(`${url}adjuntos`);
    if (!response.ok) {
        throw new Error('Error al obtener adjuntos');
    }
    return response.json();
};

export const fetchadjunto = async (id) => {
    const response = await fetch(`${url}adjuntos/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el adjunto');
    }
    return response.json();
};


export const createadjuntos = async (adjunto, file) => {
    // Verificación de que el archivo sea válido
    if (!file || !(file instanceof File)) {
        throw new Error('El archivo debe ser válido');
    }

    const formData = new FormData();
    
    // Añadir los datos del adjunto
    formData.append('IdPredio', parseInt(adjunto.IdPredio, 10));
    formData.append('NumAdjunto', adjunto.NumAdjunto || 1);
    formData.append('Tipo', adjunto.Tipo || file.type.split('/').pop()); // Extrae la extensión del tipo MIME

    // Verificación de archivo obligatorio
    if (file) {
        formData.append('file', file);
    } else {
        throw new Error('El archivo es obligatorio para adjuntar');
    }

    try {
        // Llamada a la API para crear el adjunto
        const response = await fetch(`${url}adjuntos`, {
            method: 'POST',
            body: formData,
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al crear el adjunto: ${errorText}`);
        }

        // Retornar el resultado exitoso de la API
        return await response.json();
    } catch (error) {
        console.error('Error en createadjuntos:', error);  // Error detallado en consola
        throw error;  // Re-lanzar el error para manejarlo en otro lugar
    }
};


export const updateadjuntos = async (id, adjunto) => {
    const predioToSend = {
        ...adjunto,
        Tipo: parseInt(adjunto.Tipo),
        NumeroAdjunto: parseInt(adjunto.SubD),
    };

    console.log('Datos enviados al servidor para actualización:', predioToSend);

    try {
        const response = await fetch(`${url}adjuntos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(predioToSend)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al actualizar el predio:', errorText);
            throw new Error(`Error al actualizar el predio: ${errorText}`);
        }

        if (response.status === 204) {
            return true; // Éxito, pero sin contenido
        }

        return await response.json(); // Devuelve el predio actualizado si hay contenido
    } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
        throw error;
    }
};

export const deleteadjuntos = async (id) => {
    try {
        const response = await fetch(`${url}adjuntos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al eliminar el predio:', errorText);
            throw new Error(`Error al eliminar el predio: ${errorText}`);
        }

        // Si la respuesta es exitosa pero no contiene contenido, simplemente retornamos true
        if (response.status === 204) {
            return true;
        }

        // Si hay contenido, intentamos parsearlo como JSON
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error en la solicitud de eliminación:', error);
        throw error;
    }
}; 