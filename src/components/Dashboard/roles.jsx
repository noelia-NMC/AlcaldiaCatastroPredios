import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusCircleIcon,
  AdjustmentsVerticalIcon
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { fetchRoles, createRol, updateRol, deleteRol } from '../../service/rolService';
import {
  FormContainer, Header, Title, Form, Input, Button, Table, Th, Td, Tr, StatusBadge, PermissionTag, FlexContainer,
  ActionContainer, IconButton, StyledSelect
} from './stylesDashboard/styleRol';

const permisosDisponibles = [
  { value: 'CreacionUsuarios', label: 'Creación de Usuarios' },
  { value: 'AsignacionRoles', label: 'Asignación de Roles' },
  { value: 'CreacionEdicionRoles', label: 'Creación y Edición de Roles' },
  { value: 'CreacionArchivo', label: 'Creación de Archivo' },
  { value: 'Digitalizar', label: 'Digitalizar' },
  { value: 'ConsultaBasica', label: 'Consulta Básica' },
  { value: 'Impresion', label: 'Impresión' },
  { value: 'EditarArchivo', label: 'Editar Archivo' },
  { value: 'BusquedaArchivos', label: 'Búsqueda de Archivos' },
  { value: 'Visualizacion', label: 'Visualización' }
];

const userID = 1; // Cambia esto según cómo obtengas el ID del usuario autenticado

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedPermisos, setSelectedPermisos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [newEstado, setNewEstado] = useState(true); // Inicializa como true o false

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const serverRoles = await fetchRoles();
      setRoles(serverRoles);
    } catch (error) {
      toast.error(`Error al cargar los roles: ${error.message}`);
    }
  };

  const handleCreateOrUpdateRole = async (e) => {
    e.preventDefault();

    if (!newRoleName.trim()) {
        toast.error('Por favor, ingrese un nombre para el rol');
        return;
    }

    if (selectedPermisos.length === 0) {
        toast.error('Por favor, seleccione al menos un permiso');
        return;
    }

    const roleData = {
        NombreRol: newRoleName,
        Estado: newEstado, // Asegúrate de que este valor sea booleano
        Permisos: selectedPermisos.map(p => p.value),
    };

    try {
        if (isEditing) {
            await updateRol(userID, editRoleId, { ...roleData, IdRol: editRoleId }); // Incluye IdRol solo al actualizar
            toast.success('Rol actualizado correctamente');
        } else {
            await createRol(userID, roleData); // Pasa userID y roleData
            toast.success('Nuevo rol creado correctamente');
        }
        resetForm();
        loadRoles();
    } catch (error) {
        toast.error(`Error al ${isEditing ? 'actualizar' : 'crear'} el rol: ${error.message}`);
    }
};


  const handleEditRole = (role) => {
    setNewRoleName(role.NombreRol);
    setSelectedPermisos(
      permisosDisponibles.filter(permiso => role.Permisos.includes(permiso.value))
    );
    setEditRoleId(role.IdRol);
    setIsEditing(true);
    setNewEstado(role.Estado); // Establece el estado del rol al editar
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      try {
        await deleteRol(userID, roleId);
        setRoles(roles.filter(role => role.IdRol !== roleId));
        toast.success('Rol eliminado correctamente');
      } catch (error) {
        toast.error(`Error al eliminar el rol: ${error.message}`);
      }
    }
  };

  const handleToggleEstado = async (role) => {
    const updatedRole = { ...role, Estado: !role.Estado };
    try {
      await updateRol(userID, role.IdRol, updatedRole);
      setRoles(roles.map(r => (r.IdRol === role.IdRol ? updatedRole : r)));
      toast.success(`El estado del rol "${role.NombreRol}" ha sido ${updatedRole.Estado ? 'activado' : 'desactivado'}`);
    } catch (error) {
      toast.error(`Error al cambiar el estado del rol: ${error.message}`);
    }
  };

  const resetForm = () => {
    setNewRoleName('');
    setSelectedPermisos([]);
    setIsEditing(false);
    setEditRoleId(null);
    setNewEstado(true); // Resetea el estado a true
  };

  const handleCancel = () => {
    resetForm();
    toast.info('Edición cancelada');
  };

  return (
    <FormContainer>
      <Header>
        <Title>
          <UserGroupIcon width={24} height={24} />
          Gestión de Roles
        </Title>
      </Header>

      <Form onSubmit={handleCreateOrUpdateRole}>
        <Input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="Nombre del Rol"
        />
        <label>
          Estado:
          <input
            type="checkbox"
            checked={newEstado}
            onChange={(e) => setNewEstado(e.target.checked)} 
          />
        </label>
        <StyledSelect
          isMulti
          name="permisos"
          options={permisosDisponibles}
          className="basic-multi-select"
          classNamePrefix="react-select"
          value={selectedPermisos}
          onChange={setSelectedPermisos}
          placeholder="Seleccionar permisos"
        />
        <Button type="submit" style={{ gridColumn: '1 / -1' }}>
          {isEditing ? (
            <>
              <PencilIcon width={16} height={16} />
              Actualizar Rol
            </>
          ) : (
            <>
              <PlusCircleIcon width={16} height={16} />
              Crear Nuevo Rol
            </>
          )}
        </Button>
        {isEditing && (
          <Button type="button" onClick={handleCancel} style={{ gridColumn: '1 / -1', backgroundColor: '#f56565', color: '#fff' }}>
            <XCircleIcon width={16} height={16} />
            Cancelar
          </Button>
        )}
      </Form>

      <Table>
        <thead>
          <tr>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Permisos</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol, index) => (
            <Tr key={rol.IdRol || rol.NombreRol} $isEven={index % 2 === 0}>
              <Td>{rol.NombreRol}</Td>
              <Td>
                <StatusBadge $active={rol.Estado} onClick={() => handleToggleEstado(rol)} style={{ cursor: 'pointer' }}>
                  {rol.Estado ? (
                    <>
                      <CheckCircleIcon width={16} height={16} />
                      Activo
                    </>
                  ) : (
                    <>
                      <XCircleIcon width={16} height={16} />
                      Inactivo
                    </>
                  )}
                </StatusBadge>
              </Td>
              <Td>
                <FlexContainer>
                  {rol.Permisos.map(p => (
                    <PermissionTag key={p}>
                      <AdjustmentsVerticalIcon width={12} height={12} style={{ marginRight: '4px' }} />
                      {permisosDisponibles.find(pd => pd.value === p)?.label}
                    </PermissionTag>
                  ))}
                </FlexContainer>
              </Td>
              <Td>
                <ActionContainer>
                  <IconButton
                    onClick={() => handleEditRole(rol)}
                    $color="info"
                    $hoverColor="primary"
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Editar rol"
                  >
                    <PencilIcon width={20} height={20} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteRole(rol.IdRol)}
                    $color="danger"
                    $hoverColor="danger"
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Eliminar rol"
                  >
                    <TrashIcon width={20} height={20} />
                  </IconButton>
                </ActionContainer>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
    </FormContainer>
  );
};

export default Roles;
