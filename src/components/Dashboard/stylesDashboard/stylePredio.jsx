import styled from 'styled-components';

// Tema de colores
export const theme = {
  primary: '#00a684',
  secondary: '#00b4db',
  accent: '#482d82',
  warning: '#f58a2f',
  danger: '#aa1c5d',
  info: '#00b4db',

  primaryLight: '#3ebeaa',
  secondaryLight: '#3cc3de',
  accentLight: '#685ca8',
  warningLight: '#faad59',
  dangerLight: '#f05b80',

  textLight: '#666666',
  border: '#e0e0e1',
};

// Contenedores generales
export const FormContainer = styled.div`
  max-width: 900px;
  padding: 2em;
  margin: 1rem auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.primaryLight};
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const SearchSection = styled.div`
  height:40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f8f8f9;
  border-radius: 8px;
  padding: 1rem 1em;
  gap:8em;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const TableSection = styled.div`
  overflow-x: auto;
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Componentes de búsqueda
export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction:row;
  gap: 1em;
`;

export const SearchInput = styled.input`
  width: 80%;
  height: 16px;
  padding: 0.7rem;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${theme.textLight};
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px ${theme.primaryLight}40;
  }
`;

export const DropdownButton = styled.button`
  width: 80%;
  height: 40px;
  padding: 0.7rem;
  background-color: ${theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.primaryLight};
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  margin-top: 4em;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${theme.primaryLight}10;
  }
`;

// Botones y otros componentes interactivos
export const AddButton = styled.button`
  padding: 0.6rem;
  background: ${theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    filter: brightness(105%);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ color }) => theme[color] || theme.textLight};
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    background: ${theme.primaryLight}10;
    color: ${theme.primary};
  }
`;

// Tab y secciones
export const TabContent = styled.div`
  padding: 1rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.accent};
`;

// Inputs para archivos
export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  padding: 0.5rem 1rem;
  border: 1px dashed ${theme.border};
  border-radius: 6px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  font-size: 0.8rem;
  color: ${theme.textLight};

  &:hover {
    background: ${theme.primaryLight}10;
    border-color: ${theme.primary};
  }
`;

export const StyledFileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  font-size: 0.8rem;

  li {
    padding: 0.5rem;
    border-bottom: 1px solid ${theme.border};

    &:last-child {
      border-bottom: none;
    }
  }
`;

// Modal
export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.accent};
  margin-bottom: 1rem;
`;

export const ModalColumnsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const ModalColumn = styled.div`
  flex: 1;
`;

// PDF Viewer
export const PDFViewerContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  background: white;
`;

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
  },
};

// Definición del componente Button
export const Button = styled.button`
  padding: 0.6rem;
  background: #00a684;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(105%);
  }
`;

// Definición del componente Form
export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #e0e0e1;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #e0e0e1;
  border-radius: 6px;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #00a684;
    box-shadow: 0 0 0 2px #3ebeaa40;
  }

  &::placeholder {
    color: #666666;
  }
`;


export const Select = styled.select`
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #e0e0e1;
  border-radius: 6px;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #00a684;
    box-shadow: 0 0 0 2px #3ebeaa40;
  }
`;

export const Table = styled.table`
   width: 100%;
  font-size: 0.8rem;
`;

export const Th = styled.th`
  background: ${theme.primary};
  color: white;
  padding: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Td = styled.td`
  padding: 0.875rem 0.75rem;
  border-bottom: 2px solid ${theme.border};
`;

export const Tr = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.primaryLight}10;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const Title = styled.h2`
  color: ${theme.primary};
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
