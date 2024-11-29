export const roles = {
  ADMINISTRADOR: 'administrador',
  CONSULTA_BASICA: 'consulta_basica',
  DIGITALIZADOR: 'digitalizador',
  IMPRESOR: 'impresor'
};

export const roleConfig = {
  [roles.ADMINISTRADOR]: {
    permissions: [
      'CREAR_USUARIO',
      'HABILITAR_USUARIO',
      'DESHABILITAR_USUARIO',
      'ASIGNAR_ROLES',
      'CREAR_ROL',
      'EDITAR_ROL',
      'CREAR_ARCHIVO',
      'DIGITALIZAR',
      'CONSULTAR',
      'IMPRIMIR',
      'EDITAR_ARCHIVO',
      'DESCARGAR_PDF',
    ],
    components: ['rol', 'rolUsuario', 'usuario', 'predio', 'transacciones']
  },

  [roles.DIGITALIZADOR]: {
    permissions: [
      'CREAR_ARCHIVO',
      'DIGITALIZAR',
      'EDITAR_ARCHIVO'
    ],
    components: ['predio']
  },
  [roles.CONSULTA_BASICA]: {
    permissions: [
      'BUSCAR_ARCHIVO',
      'VISUALIZAR'
    ],
    components: ['transacciones']
  },
  [roles.IMPRESOR]: {
    permissions: [
      'BUSCAR_ARCHIVO',
      'VISUALIZAR',
      'IMPRIMIR'
    ],
    components: ['transacciones']
  }
};

export const permissions = Object.values(roleConfig).reduce((allPermissions, role) => {
  return [...new Set([...allPermissions, ...role.permissions])];
}, []);

export const hasPermission = (userRole, permission) => {
  return roleConfig[userRole]?.permissions.includes(permission) || false;
};

export const getUserPermissions = (userRole) => {
  return roleConfig[userRole]?.permissions || [];
};

export const canAccessComponent = (userRole, component) => {
  return roleConfig[userRole]?.components.includes(component) || false;
};

export const getAccessibleComponents = (userRole) => {
  return roleConfig[userRole]?.components || [];
};