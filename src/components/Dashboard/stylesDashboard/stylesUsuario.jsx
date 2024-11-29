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

// Contenedor principal del formulario
export const FormContainer = styled.div`
  max-width: 1000px;
  padding:2em;
  margin: 1rem auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

// Select para el estado
export const Select = styled.select`
  width: 87%;
  padding: 0.7rem;
  border: 1px solid #3a506b;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #3a506b;

  &:focus {
    outline: none;
    border-color: #5bc0be;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $color }) => theme[$color] || theme.text};
  transition: all 0.2s ease;
  padding: 0.375rem;
  border-radius: 50%;

  &:hover {
    color: ${({ $hoverColor }) => theme[$hoverColor] || theme.primary};
    background: ${theme.surface};
  }
`;

export const Button = styled.button`
  width:20%;
  padding: 0.6rem;
  background: ${({ variant }) => theme[variant] || theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    filter: brightness(105%);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.primaryLight};
`;

export const Title = styled.h2`
  color: ${theme.primary};
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Input = styled.input`
  width: 80%;
  padding: 0.625rem 1rem;
  border: 1px solid ${theme.border};
  border-radius: 6px;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px ${theme.primaryLight}40;
  }

  &::placeholder {
    color: ${theme.textLight};
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

