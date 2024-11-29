
import { FaFileAlt, FaChartBar, FaSearch, FaUserShield, FaCog } from 'react-icons/fa';
import { permissions } from '../../config/rolesConfig';
import { Container, Card, CardTitle, IconWrapper } from './stylesDashboard/styleNav';
import { useAuth } from '../../context/authContext';

const dashboardItems = {
  ARCHIVO: { name: 'Archivo', icon: <FaFileAlt />, path: '/archivo' },
  REPORTES: { name: 'Reportes', icon: <FaChartBar />, path: '/reportes' },
  BUSCADOR: { name: 'Buscador', icon: <FaSearch />, path: '/buscador' },
  ROLES: { name: 'Roles', icon: <FaUserShield />, path: '/roles' },
  ADMINISTRACION: { name: 'Administración', icon: <FaCog />, path: '/administracion' },
  DOCUMENTOS: { name: 'Documentos', icon: <FaFileAlt />, path: '/documentos' },
  TRANSACCIONES: { name: 'Transacciones', icon: <FaChartBar />, path: '/transacciones' }
};

const Nav = () => {
  const { user } = useAuth();
  const userPermissions = permissions[user?.role] || [];

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Acceso a las funciones según tu rol.</p>
      <div className="cards">
        {userPermissions.map((perm) => (
          <Card key={perm} onClick={() => window.location.href = dashboardItems[perm].path}>
            <IconWrapper>{dashboardItems[perm].icon}</IconWrapper>
            <CardTitle>{dashboardItems[perm].name}</CardTitle>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Nav;
