import { useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  UserAvatar,
  HeaderWrapper,
  HeaderContent,
  Logo,
  UserSection,
  UserName,
  DropdownMenu,
  DropdownItem,
  UserInfoWrapper,

} from "../../styles/styleHeader";
import Modal from "./modal";
import UserSettings from "../Dashboard/UserSettings";
import logo from "../../assets/logo.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

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
                <UserName>{user.fullName || "Usuario"}</UserName>
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