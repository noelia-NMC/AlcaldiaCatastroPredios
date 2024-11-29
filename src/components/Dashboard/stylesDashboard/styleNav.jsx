import styled, { keyframes } from 'styled-components';

// Paleta de colores refinada
const colors = {
  primary: '#482d82',    // Morado oscuro para elementos principales
  secondary: '#aa1c5d',  // Guindo para acentos
  tertiary: '#00a684',   // Verde para elementos interactivos
  background: '#f8f9fa', // Fondo claro
  text: '#333333',       // Texto oscuro para buena legibilidad
  lightAccent: '#e6e6fa' // Lavanda claro para hover y elementos secundarios
};

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const Container = styled.div`
  padding: 20px;
  background-color: ${colors.background};
  min-height: 100vh;
  margin-top: 80px;
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  transition: margin-left 0.5s ease;
  animation: ${fadeIn} 0.5s ease;
`;

export const Card = styled.div`
  display: inline-block;
  width: 200px;
  margin: 20px;
  padding: 25px;
  border-radius: 15px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  animation: ${slideIn} 0.5s ease;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const IconWrapper = styled.div`
  font-size: 2.8em;
  color: ${colors.primary};
  margin-bottom: 15px;
  transition: color 0.3s ease, transform 0.3s ease;

  ${Card}:hover & {
    color: ${colors.secondary};
    transform: scale(1.1);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
  color: ${colors.text};
  margin-top: 15px;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: ${colors.primary};
  }
`;
