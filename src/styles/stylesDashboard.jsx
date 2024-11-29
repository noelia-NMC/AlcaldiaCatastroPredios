import styled from 'styled-components';

const colors = {
  primary: '#00a684',
  secondary: '#00b4db',
  background: '#f4f7f6',
  text: '#333333',
  lightText: '#6b7280',
  white: '#ffffff'
};

export const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  overflow: hidden;
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 15px;
  padding: 20px;
  background-color: ${colors.background};
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const Card = styled.div`
  flex: 1;
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  border: 1px solid #e5e7eb;
  height: 60%; // Reduced height
  max-width: 300px;

  @media (max-width: 768px) {
    height: auto;
    max-width: 100%;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  background-color: ${colors.primary};
  color: white;
  padding: 12px; // Reduced padding
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px; // Reduced font size
  display: flex;
  align-items: center;
  gap: 8px; // Reduced gap
`;

export const CardBody = styled.div`
  padding: 16px; // Reduced padding
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  padding: 8px 12px; // Reduced padding
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px; // Reduced font size
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  transition: background-color 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: ${colors.primary};
  }
`;