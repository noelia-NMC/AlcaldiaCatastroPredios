import { url } from "./http";

export const fetchAdjuntos = async (id_u) => {
    const response = await fetch(`${url}${id_u}/adjuntos`);
    if (!response.ok) {
        throw new Error('Error al obtener adjuntos');
    }
    return response.json();
};

export const fetchAdjunto = async (id_u, id) => {
    const response = await fetch(`${url}${id_u}/adjuntos/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el adjunto');
    }
    return response.json();
};

export const createAdjunto = async (id_u, adjunto, file) =>{
    if (!file || !(file instanceof File)) {
        throw new Error('El archivo debe ser válido');
    }

    const formData = new FormData();
    formData.append('IdPredio', parseInt(adjunto.IdPredio, 10));
    formData.append('NumAdjunto', adjunto.NumAdjunto || 1);
    formData.append('Tipo', adjunto.Tipo || file.type.split('/').pop());
    formData.append('file', file);

    try {
        const response = await fetch(`${url}${id_u}/adjuntos`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al crear el adjunto: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en createAdjunto:', error);
        throw error;
    }
};

export const updateAdjunto = async (id_u, id, adjunto) => {
    const adjuntoToSend = {
        ...adjunto,
        Tipo: parseInt(adjunto.Tipo),
        NumeroAdjunto: parseInt(adjunto.NumAdjunto),
    };

    try {
        const response = await fetch(`${url}${id_u}/adjuntos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adjuntoToSend)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar el adjunto: ${errorText}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
        throw error;
    }
};

export const deleteAdjunto = async (id_u, id) => {
    try {
        const response = await fetch(`${url}${id_u}/adjuntos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al eliminar el adjunto: ${errorText}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error('Error en la solicitud de eliminación:', error);
        throw error;
    }
};
