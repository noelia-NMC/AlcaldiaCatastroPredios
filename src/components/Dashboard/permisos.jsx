import { 
  Table, 
  Th
} from './stylesDashboard/stylePermisos';

const Permisos = () => {
  return (
    <div className="permisos-container">
      <h1>Gestión de Permisos</h1>
      <div className="roles-list">
        <Table>
          <thead>
            <tr>
              <Th>Rol ID</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
};

export default Permisos;
