import styled from 'styled-components';

const colors = {
  primary: '#00a684',
  secondary: '#aa1c5d',
  tertiary: '#00a689',
  background: '#f8f9fa',
  text: '#333333',
  lightAccent: '#e6e6fa',
  celeste: '#00b4db',
};

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderWrapper = styled.header`
  background-color: ${colors.primary};
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;

  img {
    height: 40px;
    max-height: 60px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  gap: 10px;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const UserAvatar = styled.div`
  background-color: ${colors.tertiary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: ${colors.celeste};
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

export const UserName = styled.span`
  color: white;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1001;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
  }
`;

export const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  color: ${colors.text};
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.lightAccent};
    color: ${colors.primary};
  }
`;

