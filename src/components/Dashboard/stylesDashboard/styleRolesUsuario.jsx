import styled from 'styled-components';

// Contenedor principal del formulario
export const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f0f5f9;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

// Formulario con una estructura de columnas
export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// Inputs del formulario
export const Input = styled.input`
  width: 80%;
  padding: 0.7rem;
  border: 1px solid #3a506b;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #3a506b;

  &:focus {
    outline: none;
    border-color: #5bc0be;
  }
`;

// Select para el estado
export const Select = styled.select`
  width: 87%;
  padding: 0.7rem;
  border: 1px solid #3a506b;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #3a506b;

  &:focus {
    outline: none;
    border-color: #5bc0be;
  }
`;

// Botón con hover animado
export const Button1 = styled.button`
  width:87%;
  background-color: #3a506b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5bc0be;
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3a506b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5bc0be;
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

// Tabla con estilos mejorados
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

export const Th = styled.th`
  background-color: #3a506b;
  color: white;
  padding: 0.8rem;
  text-align: left;
`;

export const Td = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
