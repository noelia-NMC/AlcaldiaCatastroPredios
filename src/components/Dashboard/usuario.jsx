import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/solid';
import {
  fetchUsuarios,
  fetchUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../../service/usuarioService';
import { fetchRoles } from '../../service/rolService';
import {
  FormContainer,
  Form,
  Input,
  Select,
  Button,
  Table,
  Th,
  Td,
  Tr
} from './stylesDashboard/stylesUsuario';
import { ActionContainer, Header, IconButton, Title } from './stylesDashboard/styleRol';
import { Tooltip } from 'react-tooltip';

// Suponiendo que tienes el ID del usuario autenticado en `userID`
const userID = 1; // Cambia esto según cómo obtengas el ID del usuario autenticado

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    IDUsuario: 0,
    Nombre: "",
    Appat: "",
    Apmat: "",
    Username: "",
    Password: "",
    Estado: true,
    IdRol: ""
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadUsuarios();
    loadRoles();
  }, []);

  const loadUsuarios = async () => {
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await fetchRoles();
      setRoles(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuario({
      ...usuario,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateUsuario(userID, usuario.IDUsuario, usuario);
        toast.success('Usuario actualizado correctamente.');
      } else {
        await createUsuario(userID, usuario);
        toast.success('Usuario creado correctamente.');
      }
      resetForm();
      loadUsuarios();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const data = await fetchUsuario(id);
      setUsuario(data);
      setEditing(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(userID, id);
      loadUsuarios();
      toast.success('Usuario eliminado correctamente.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setUsuario({
      IDUsuario: 0,
      Nombre: "",
      Appat: "",
      Apmat: "",
      Username: "",
      Password: "",
      Estado: true,
      IdRol: ""
    });
    setEditing(false);
  };

  return (
    <FormContainer>
      <Header>
        <Title>
          <UserGroupIcon width={24} height={24} />
          Gestión de Usuarios
        </Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={usuario.Nombre}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="Appat"
          placeholder="Apellido Paterno"
          value={usuario.Appat}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="Apmat"
          placeholder="Apellido Materno"
          value={usuario.Apmat}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="Username"
          placeholder="Nombre de usuario"
          value={usuario.Username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="Password"
          placeholder="Contraseña"
          value={usuario.Password}
          onChange={handleChange}
          required={!editing}
        />
        <Select
          name="IdRol"
          value={usuario.IdRol}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.IdRol} value={rol.IdRol}>
              {rol.NombreRol}
            </option>
          ))}
        </Select>
        <Select
          name="Estado"
          value={usuario.Estado.toString()}
          onChange={handleChange}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </Select>
        <Button type="submit">{editing ? 'Actualizar' : 'Crear'}</Button>
        {editing && (
          <Button type="button" onClick={resetForm}>Cancelar Edición</Button>
        )}
      </Form>

      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Rol</Th>
            <Th>Nombre</Th>
            <Th>Apellido Paterno</Th>
            <Th>Apellido Materno</Th>
            <Th>Usuario</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <Tr key={u.IDUsuario}>
              <Td>{u.IDUsuario}</Td>
              <Td>{roles.find(role => role.IdRol === u.IdRol)?.NombreRol || 'Sin rol'}</Td>
              <Td>{u.Nombre}</Td>
              <Td>{u.Appat}</Td>
              <Td>{u.Apmat}</Td>
              <Td>{u.Username}</Td>
              <Td>{u.Estado ? 'Activo' : 'Inactivo'}</Td>
              <Td>
                <ActionContainer>
                  <IconButton
                    onClick={() => handleEdit(u.IDUsuario)}
                    $color="info"
                    $hoverColor="primary"
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Editar usuario"
                  >
                    <PencilIcon width={20} height={20} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(u.IDUsuario)}
                    $color="danger"
                    $hoverColor="danger"
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Eliminar usuario"
                  >
                    <TrashIcon width={20} height={20} />
                  </IconButton>
                </ActionContainer>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
    </FormContainer>
  );
};

export default Usuario;
