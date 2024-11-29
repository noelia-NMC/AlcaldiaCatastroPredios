import styled, { keyframes } from 'styled-components';

// Animaciones para los círculos flotantes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Decoración de fondo para agregar círculos
export const BackgroundDecoration = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

// Círculos flotantes con nuevos colores y tamaños
export const FloatingCircle = styled.div`
  position: absolute;
  width: ${(props) => props.size || '50px'};
  height: ${(props) => props.size || '50px'};
  border-radius: 50%;
  background: ${(props) => props.color || 'rgba(255, 255, 255, 0.4)'};
  animation: ${float} ${(props) => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || '0s'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  opacity: 0.8;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #00b4db, #f58a2f);
  position: relative;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 40%;
  height: 75%;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

export const LeftSection = styled.div`
  width: -50px;
  height: 25em;
  position: relative;
  z-index: 100;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  padding: 2em;
`;

export const ImageOverlay = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 350px;
  height: 100%;
  background: #00a684;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #00b4db;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
  width: 300px;
  height: 200px;
  animation: ${pulse} 6s infinite ease-in-out;
`;

export const Img = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Form = styled.form`
  width: 95%;
  height: 80%;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
`;

export const Input = styled.input`
  width: 250px;
  padding: 1em;
  margin-bottom: 1.5em;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 1em;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00b4db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,180,219,0.2);
  }
`;

export const Button = styled.button`
  margin-top: 1em;
  width: 280px;
  padding: 1em;
  background-color: #f05b80;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    background-color: #aa1c5d;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;
