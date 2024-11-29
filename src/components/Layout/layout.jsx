import { useState } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Sidebar from "./sidebar";
import { LayoutContainer, MainContent } from "../../styles/styleLayout";

const Layout = ({ children, setActiveComponent }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <LayoutContainer>
      <Header />
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={setActiveComponent}
      />
      <MainContent $isSidebarOpen={sidebarOpen}>{children}</MainContent>
    </LayoutContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Layout;
