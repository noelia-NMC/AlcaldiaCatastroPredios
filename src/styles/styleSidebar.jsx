import styled from 'styled-components';

const colors = {
  primary: '#482d82',
  secondary: '#6a4eb6',
  background: '#f4f6f9',
  text: '#333333',
  lightAccent: '#e6e6fa',
  white: '#ffffff',
  hover: '#f0f0f0',
};

export const SidebarWrapper = styled.div`
  background-color: ${colors.white};
  height: 100vh;
  width: ${({ $open }) => ($open ? '250px' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 80px;
  transition: width 0.3s ease;
  box-shadow: ${({ $open }) => ($open ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: 900;
  overflow: hidden;
  border-right: 1px solid ${colors.background};
`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  z-index: 1100;
  padding: 5px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  span {
    width: 22px;
    height: 3px;
    background-color: ${colors.primary};
    transition: all 0.3s ease;
  }

  &:hover span {
    background-color: ${colors.secondary};
  }
`;

export const SidebarContent = styled.div`
  padding: 20px 0;
  width: 250px;
  overflow-y: auto;
  height: calc(100% - 80px);
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  white-space: nowrap;
  color: ${colors.text};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background-color: ${({ $active }) => ($active ? colors.lightAccent : 'transparent')};

  &:hover {
    background-color: ${colors.hover};
    color: ${colors.primary};
  }

  svg {
    margin-right: 10px;
  }
`;