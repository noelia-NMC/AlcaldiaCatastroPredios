import { url } from "./http";

export const getLdapData = async () => {
  try {
    const response = await fetch(`${url}Ldap/usuariosLdap`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener datos LDAP: ${response.statusText}`);
    }

    const ldapDataList = await response.json();
    return ldapDataList;
  } catch (error) {
    console.error('Error en getLdapData:', error);
    throw error;
  }
};



export const verificarUsuario = async (usuario, contraseña) => {
  try {
    const response = await fetch(`${url}Ldap/VerificarUsuario?usuario=${usuario}&contraseña=${contraseña}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al verificar usuario en LDAP:', error);
    return false; // Indicar un error en la verificación
  }
};


export const actualizarLdapConfig = async (config) => {
  try {
    const response = await fetch(`${url}LdapConfig/ActualizarConfiguracion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar configuración LDAP: ${response.statusText}`);
    }

    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error al actualizar configuración LDAP:', error);
    throw error;
  }
};

export const ObtenerLdapconfig = async () => {
  try {
    const response = await fetch(`${url}LdapConfig/ObtenerConfiguracion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)

    if (!response.ok) {
      throw new Error(`Error al obtener configuración LDAP: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error al obtener configuración LDAP:', error);
    throw error;
  }
};


