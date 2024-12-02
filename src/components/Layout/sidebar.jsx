import { 
  SidebarWrapper, 
  ToggleButton, 
  SidebarContent, 
  SidebarItem 
} from "../../styles/styleSidebar";
import { 
  FaUserCog,
  FaUsers,
  FaBuilding,
  FaExchangeAlt
} from "react-icons/fa";
import PropTypes from "prop-types";

const Sidebar = ({ 
  sidebarOpen, 
  toggleSidebar, 
  setActiveComponent,
  activeComponent 
}) => {
  const sidebarItems = [
    { 
      name: "Rol", 
      component: "rol", 
      icon: FaUserCog 
    },
    { 
      name: "Usuarios", 
      component: "usuario", 
      icon: FaUsers 
    },
    { 
      name: "Predio", 
      component: "predio", 
      icon: FaBuilding 
    },
    { 
      name: "Reportes", 
      component: "transacciones", 
      icon: FaExchangeAlt 
    },
  ];

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </ToggleButton>
      
      <SidebarWrapper $open={sidebarOpen}>
        <SidebarContent $open={sidebarOpen}>
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.component} 
              $active={activeComponent === item.component}
              onClick={() => setActiveComponent(item.component)}
            >
              <item.icon />
              {item.name}
            </SidebarItem>
          ))}
        </SidebarContent>
      </SidebarWrapper>
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
  activeComponent: PropTypes.string.isRequired,
};

export default Sidebar;