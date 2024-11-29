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
  border: '#e0e0e1',
};

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80em;
  margin: 1rem auto;
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
  gap: 0;
  width: 100%;
  height: 100%;
`;

export const SearchSection = styled.div`
  flex: 0 0 30%;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const TableSection = styled.div`
  flex: 0 0 30%;
  height: 100%;
  overflow-y: auto;
  border-radius: 8px;
  background-color: #fff;
  padding: 1rem;
`;

export const PDFViewerContainer = styled.div`
  flex: 0 0 60%;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

export const SearchInput = styled.input`
  width: 80%;
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
  width: 45%;
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

export const TabContent = styled.div`
  display: block;
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
  padding: 0.5rem;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${theme.textLight};
  max-height: 150px;
  overflow-y: auto;

  div {
    padding: 0.5rem;
    border-bottom: 1px solid ${theme.border};
  }

  div:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h4`
  color: ${theme.primary};
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
`;

