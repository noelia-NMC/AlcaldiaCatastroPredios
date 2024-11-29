import { useState } from "react";
import { 
  Users, 
  Home, 
  ShieldCheck, 
  CreditCard, 
  ChevronRight,
} from "lucide-react";
import Layout from "../components/Layout/layout";
import Usuario from "../components/Dashboard/usuario";
import Predio from "../components/Dashboard/predio";
import Roles from "../components/Dashboard/roles";
import Transacciones from "../components/Dashboard/transacciones";
import { 
  DashboardContainer, 
  CardContainer, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody, 
  CardButton 
} from "../styles/stylesDashboard";

const dashboardItems = [
  {
    id: "rol",
    title: "Roles",
    icon: ShieldCheck,
    description: "Gestión de accesos"
  },
  {
    id: "usuario",
    title: "Usuarios", 
    icon: Users,
    description: "Administración de usuarios"
  },
  {
    id: "predio",
    title: "Predios",
    icon: Home,
    description: "Consulta y gestión de predios"
  },
  {
    id: "transacciones",
    title: "Transacciones",
    icon: CreditCard,
    description: "Visualización de transacciones"
  }
];

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleCardClick = (id) => {
    setActiveComponent(id);
  };

  const handleBackToDashboard = () => {
    setActiveComponent(null);
  };

  const renderContent = () => {
    if (activeComponent === null) {
      return (
        <DashboardContainer>
          <CardContainer>
            {dashboardItems.map((item) => (
              <Card key={item.id} onClick={() => handleCardClick(item.id)}>
                <CardHeader>
                  <CardTitle>
                    <item.icon size={28} strokeWidth={1.5} className="mr-1" /> 
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 mb-2">{item.description}</p> 
                  <CardButton>
                    Ir a {item.title} <ChevronRight size={14} className="ml-1" /> 
                  </CardButton>
                </CardBody>
              </Card>
            ))}
          </CardContainer>
        </DashboardContainer>
      );
    }

    const BackButton = () => (
      <button 
        onClick={handleBackToDashboard}
        className="flex items-center text-primary hover:bg-gray-100 p-2 rounded-md mb-4"
      >
      </button>
    );

    switch (activeComponent) {
      case "rol":
        return (
          <>
            <BackButton />
            <Roles />
          </>
        );
      case "usuario":
        return (
          <>
            <BackButton />
            <Usuario />
          </>
        );
      case "predio":
        return (
          <>
            <BackButton />
            <Predio />
          </>
        );
      case "transacciones":
        return (
          <>
            <BackButton />
            <Transacciones />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout setActiveComponent={setActiveComponent}>
      {renderContent()}
    </Layout>
  );
};

export default Dashboard;