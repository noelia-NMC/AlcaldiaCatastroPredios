const API_BASE_URL = '/api';

const permisosService = {
  getAllRoles: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rolusuario/`);
      if (!response.ok) {
        throw new Error('Error fetching roles');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  getRoleById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rolusuario/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching role by ID');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching role by ID:', error);
      throw error;
    }
  },

  createRole: async (idUser, roleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${idUser}/rolusuario/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleData)
      });
      if (!response.ok) {
        throw new Error('Error creating role');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  },

  updateRole: async (idUser, idRole, roleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${idUser}/rolusuario/${idRole}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleData)
      });
      if (!response.ok) {
        throw new Error('Error updating role');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  },

  deleteRole: async (idUser, idRole) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${idUser}/rolusuario/${idRole}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting role');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
};

export default permisosService;
