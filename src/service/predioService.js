import { url } from "./http";

export const fetchPredios = async () => {
    const response = await fetch(`${url}predios`);
    if (!response.ok) {
        throw new Error('Error al obtener predios');
    }
    return response.json();
};

export const fetchPredio = async (id) => {
    const response = await fetch(`${url}predios/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el predio');
    }
    return response.json();
};

export const createPredio = async (predio, file) => {
    // Validar que todos los campos requeridos estén presentes, incluyendo IdPredio
    const requiredFields = [
         'SubD', 'Manzano', 'NumeroPredio', 'Bloque', 'UnidadCat',
        'Superficie', 'FechaAprobacion', 'DocumentoAprobador', 'FechaDocumentoAprobador',
        'Planta', 'Uso', 'CodCatastral', 'TipoPredio', 'Ruta', 'IdPropietario'
    ];

    for (const field of requiredFields) {
        if (!predio[field]) {
            console.error(`Falta el campo: ${field}`);
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    // Crear FormData para los campos y el archivo
    const formData = new FormData();

    // Agregar todos los campos requeridos
    for (const field in predio) {
        formData.append(field, predio[field]);
    }

    // Si hay archivo, añadirlo a FormData
    if (file) {
        formData.append('file', file);
    }

    try {
        // Enviar la solicitud POST con los parámetros en el cuerpo de la solicitud
        const response = await fetch(`${url}predios/`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al crear el predio: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en createPredio:', error);
        throw error;
    }
};

export const updatePredio = async (id, predio) => {
    const predioToSend = {
        ...predio,
        CodCatastral: parseInt(predio.CodCatastral),
        SubD: parseInt(predio.SubD),
        Manzano: parseInt(predio.Manzano),
        NumeroPredio: parseInt(predio.NumeroPredio),
        Uso: parseInt(predio.Uso),
        Bloque: parseInt(predio.Bloque),
        Planta: parseInt(predio.Planta),
        UnidadCat: parseInt(predio.UnidadCat),
        Superficie: parseFloat(predio.Superficie),
        FechaAprobacion: new Date(predio.FechaAprobacion).toISOString(),
        FechaDocumentoAprobador: new Date(predio.FechaDocumentoAprobador).toISOString()
    };

    console.log('Datos enviados al servidor para actualización:', predioToSend);

    try {
        const response = await fetch(`${url}predios/${id}`, {
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

export const deletePredio = async (id) => {
    try {
        const response = await fetch(`${url}predios/${id}`, {
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


export const fetchPDFPredio = async (id) => {
    try {
        const response = await fetch(`${url}12/predios/${id}/archivos/combinados`, {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al obtener el PDF del predio: ${errorText}`);
        }

        return response.blob(); // Retorna el blob del PDF
    } catch (error) {
        console.error('Error al obtener el PDF:', error);
        throw error;
    }
};