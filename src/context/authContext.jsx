import { createContext, useState, useContext} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const permisosDisponibles = [
  { value: "CreacionUsuarios", label: "Creación de Usuarios" },
  { value: "AsignacionRoles", label: "Asignación de Roles" },
  { value: "CreacionEdicionRoles", label: "Creación y Edición de Roles" },
  { value: "CreacionArchivo", label: "Creación de Archivo" },
  { value: "Digitalizar", label: "Digitalizar" },
  { value: "ConsultaBasica", label: "Consulta Básica" },
  { value: "Impresion", label: "Impresión" },
  { value: "EditarArchivo", label: "Editar Archivo" },
  { value: "BusquedaArchivos", label: "Búsqueda de Archivos" },
  { value: "Visualizacion", label: "Visualización" },
];

export const rolesPredefinidos = [
  {
    IdRol: 1,
    NombreRol: "Administrador",
    Permisos: permisosDisponibles.map((p) => p.value),
    Estado: true,
  },
  {
    IdRol: 2,
    NombreRol: "Consulta Básica",
    Permisos: ["BusquedaArchivos", "Visualizacion"],
    Estado: true,
  },
  {
    IdRol: 3,
    NombreRol: "Digitalizador",
    Permisos: ["CreacionArchivo", "Digitalizar", "EditarArchivo"],
    Estado: true,
  },
  {
    IdRol: 4,
    NombreRol: "Impresor",
    Permisos: ["BusquedaArchivos", "Visualizacion", "Impresion"],
    Estado: true,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (role, username, fullName) => {
    const permisos = rolesPredefinidos.find(r => r.NombreRol === role)?.Permisos || [];
    setUser({ role, username, fullName, permisos });
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const updateUser = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:8000/api/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al actualizar el usuario.");
      }

      const updatedUser = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user,login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
