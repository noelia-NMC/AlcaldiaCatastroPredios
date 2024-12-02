import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import {
  UserAvatar,
  HeaderWrapper,
  HeaderContent,
  Logo,
  UserSection,
  UserName,
  UserRole,
  DropdownMenu,
  DropdownItem,
  UserInfoWrapper,
} from "../../styles/styleHeader";
import Modal from "./modal";
import UserSettings from "../Dashboard/UserSettings";
import logo from "../../assets/logo.png";
import { fetchRol } from "../../service/rolService";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleName, setRoleName] = useState(""); // Estado para el rol
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.roleId) {
      fetchRol(user.roleId)
        .then((role) => {
          setRoleName(role.NombreRol); // Asume que el rol tiene un campo `NombreRol`
        })
        .catch((error) => {
          console.error("Error al obtener el rol:", error.message);
          setRoleName("Sin rol");
        });
    }
  }, [user]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo>
          <img src={logo} alt="Logo" style={{ height: "40px", maxHeight: "60px" }} />
        </Logo>

        {user ? (
          <UserSection>
            <div onClick={toggleDropdown}>
              <UserInfoWrapper>
                <UserAvatar>{getInitials(user.fullName || "Usuario")}</UserAvatar>
                <div>
                  <UserName>{user.fullName || "Usuario"}</UserName>
                  <UserRole>{roleName}</UserRole> {/* Mostrar el rol */}
                </div>
              </UserInfoWrapper>
            </div>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={openModal}>Configuración</DropdownItem>
                <DropdownItem>Cambiar rol</DropdownItem>
                <DropdownItem onClick={logout}>Salir</DropdownItem>
              </DropdownMenu>
            )}
          </UserSection>
        ) : (
          <UserSection>
            <UserName>Invitado</UserName>
          </UserSection>
        )}
      </HeaderContent>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserSettings />
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
