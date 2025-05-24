import React, {
  useState
} from 'react';
import styled from 'styled-components';
import {
  colors
} from '@/constants';
import {
  convertKeyToLabel
} from '@/helpers';

const TableData = ({tableData}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get column headers from the first object's keys, excluding _id
  const getColumnHeaders = (data) => {
    if (data && data.length > 0) {
      return Object.keys(data[0]).filter((key) => key !== '_id');
    }
    return [];
  };

  const columns = getColumnHeaders(tableData);

  // Calculate pagination values
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{convertKeyToLabel(column)}</th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>

      {
        totalPages > 1 ? (
          <PaginationContainer>
            <PageButton onClick={goToPreviousPage} disabled={currentPage === 1}>
              Prev
            </PageButton>
            <PageInfo>
              Page
              {' '}
              {currentPage}
              {' '}
              of
              {' '}
              {totalPages}
            </PageInfo>
            <PageButton onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </PageButton>
          </PaginationContainer>
        ) : null
      }
    </>
  );
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${colors.Gunmetal};
  border: 1px solid #666;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 500;
    border-bottom: 1px solid #666;
    text-transform: capitalize;
    white-space: pre;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: ${colors.DarkGunmetal};
  }
  
  td {
    padding: 10px 15px;
    font-weight: 400;
    white-space: pre;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  color: white;
`;

const PageButton = styled.button`
  background: ${colors.Jacarta};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};;
  border: 1px solid #666;
  
  &:hover {
    background: ${colors.DarkGunmetal};
  }
`;

const PageInfo = styled.span`
  margin: 0 16px;
  font-size: 14px;
`;

export default TableData;
