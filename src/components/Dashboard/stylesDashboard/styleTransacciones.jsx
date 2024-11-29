import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #00a684;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;

  select, input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #00a684;
      box-shadow: 0 0 0 2px rgba(0, 166, 132, 0.2);
    }
  }
`;

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

export const TransaccionesTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 30px;
  background-color: white;
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
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;