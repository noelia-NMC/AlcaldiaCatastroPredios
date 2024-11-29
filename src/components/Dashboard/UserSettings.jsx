import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";

const avatars = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
];

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4rem;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const AvatarOption = styled.img`
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) =>
    props.selected ? "3px solid #4CAF50" : "3px solid transparent"};
  &:hover {
    transform: scale(1.05);
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const UserSettings = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.fullName || "");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");

  const handleSave = () => {
    if (!user || !user.IDUsuario) {
      console.error("User or User ID is not defined.");
      return;
    }

    updateUser(user.IDUsuario, { fullName: name, avatar: selectedAvatar });
  };

  return (
    <Container>
      <SectionTitle>Configuración de Usuario</SectionTitle>
      <InputGroup>
        <Label>Nombre</Label>
        <Input
          type="text"
          value={name}
          placeholder="Ingrese su nombre"
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Selecciona un avatar</Label>
        <AvatarGrid>
          {avatars.map((avatar) => (
            <AvatarOption
              key={avatar}
              src={`/images/avatars/${avatar}`}
              selected={selectedAvatar === avatar}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </AvatarGrid>
      </InputGroup>
      <SaveButton onClick={handleSave}>Guardar cambios</SaveButton>
    </Container>
  );
};

export default UserSettings;
