import styled from 'styled-components';

const colors = {
  background: '#f8f9fa',
  primary: '#482d82',
};

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${colors.background};
`;

export const MainContent = styled.main`
  flex-grow: 1;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '250px' : '0')};
  width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'calc(100% - 250px)' : '100%')};
  padding: 80px 20px 20px;
  transition: all 0.3s ease;
  background-color: ${colors.background};

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const PageTitle = styled.h1`
  color: ${colors.primary};
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;