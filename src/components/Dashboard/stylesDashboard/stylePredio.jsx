import styled from 'styled-components';

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
  border: '#e0e0e1'
};

export const FormContainer = styled.div`
  display:flex;
  flex-direction:column;
  height:95%;
  width:60em;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h2`
  color: ${theme.primary};
  font-size: 1.8rem;
  text-align: center;
`;

export const FlexContainer = styled.div`
  display: flex;
  width:100%;
  height:100%;
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
  display: flex;
  justify-content: center; 
  border-radius: 8px;
  background-color: #fff;
  padding: 1rem;
`;


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
  padding: 10px 12px;
  font-size: 0.9rem;
  color: ${theme.textLight};
  cursor: pointer;
  &:hover {
    background-color: ${theme.primaryLight}20;
  }
`;

export const AddButton = styled.button`
  background-color: ${theme.secondary};
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  width:20%;
  height:40px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.secondaryLight};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  background-color: ${theme.primary};
  color: white;
  padding: 0.7rem;
  text-align: left;
  font-size: 0.9rem;
`;

export const Td = styled.td`
  padding: 0.7rem;
  border-bottom: 1px solid ${theme.border};
  font-size: 0.9rem;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.primaryLight}10;
  }
  &:hover {
    background-color: ${theme.primaryLight}20;
  }
`;

export const ActionIcon = styled.span`
  cursor: pointer;
  margin-right: 8px;
  color: ${theme.primary};
  &:hover {
    color: ${theme.secondary};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Tab = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: ${props => props.active ? theme.primary : '#f0f5f9'};
  color: ${props => props.active ? 'white' : theme.primary};
  border: none;
  border-bottom: ${props => props.active ? 'none' : `2px solid ${theme.primary}`};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.active ? theme.primaryLight : '#e0e5e9'};
  }
`;

export const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h3`
  color: ${theme.primary};
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ModalColumnsContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ModalColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${theme.textLight};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px ${theme.primaryLight}40;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${theme.textLight};
  background-color: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px ${theme.primaryLight}40;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  background-color: ${props => theme[props.variant] || theme.primary};
  color: white;
  border: none;
  padding: 0.7rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => theme[`${props.variant}Light`] || theme.primaryLight};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.7rem 1.25rem;
  background-color: ${theme.secondary};
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.secondaryLight};
  }
`;

export const StyledFileList = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  padding: 0.5rem;

  > div {
    padding: 0.3rem 0;
    border-bottom: 1px solid ${theme.border};
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'none',
  },
};

export const SectionTitle = styled.div`

`;