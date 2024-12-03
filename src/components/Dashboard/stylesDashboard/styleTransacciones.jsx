import styled from 'styled-components';

export const Button = styled.button`
  padding: 12px 24px;
  background-color: #00a684;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #008060;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;


export const Container = styled.div`
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  color: #333333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  input, button {
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: #00a684;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #008060;
    }
  }
`;

export const TransaccionesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    background-color: #00a684;
    color: white;
    text-transform: uppercase;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;
