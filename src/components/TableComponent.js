import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-collapse: collapse;

  /* Hide all columns except S.No and Name in mobile view */
  @media (max-width: 768px) {
    td:nth-child(n + 3),
    th:nth-child(n + 3) {
      display: none;
    }
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f4f4f4;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 18px;
  &:hover {
    color: #0056b3;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  &:disabled {
    background-color: #ccc;
  }
`;

const CountWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
`;

const ColumnToggleWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const TableComponent = ({ servicesData, handleEdit, handleDelete }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // You can adjust this number for more/less rows per page

  // State for toggling column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    contact: true,
    alternateContact: true,
    area: true,
    city: true,
    pincode: true,
    designation: true,
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = servicesData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(servicesData.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Toggle column visibility
  const toggleColumn = (column) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  return (
    <>
      {/* Count Display */}
      <CountWrapper>Total Services: {servicesData.length}</CountWrapper>

      {/* Column Toggle Controls */}
      <ColumnToggleWrapper>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.contact}
            onChange={() => toggleColumn("contact")}
          />
          Contact
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.alternateContact}
            onChange={() => toggleColumn("alternateContact")}
          />
          Alternate Contact
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.area}
            onChange={() => toggleColumn("area")}
          />
          Area
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.city}
            onChange={() => toggleColumn("city")}
          />
          City
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.pincode}
            onChange={() => toggleColumn("pincode")}
          />
          Pincode
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleColumns.designation}
            onChange={() => toggleColumn("designation")}
          />
          Designation
        </label>
      </ColumnToggleWrapper>

      {/* Table */}
      <Table>
        <thead>
          <tr>
            <Th>S.No</Th>
            <Th>Name</Th>
            {visibleColumns.contact && <Th>Contact</Th>}
            {visibleColumns.alternateContact && <Th>Alternate Contact</Th>}
            {visibleColumns.area && <Th>Area</Th>}
            {visibleColumns.city && <Th>City</Th>}
            {visibleColumns.pincode && <Th>Pincode</Th>}
            {visibleColumns.designation && <Th>Designation</Th>}
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map(([id, entry], index) => (
              <tr key={id}>
                <Td>{indexOfFirstRow + index + 1}</Td> {/* S.No Column */}
                <Td>{entry.name}</Td>
                {visibleColumns.contact && <Td>{entry.contact}</Td>}
                {visibleColumns.alternateContact && (
                  <Td>{entry.alternateContact}</Td>
                )}
                {visibleColumns.area && <Td>{entry.area}</Td>}
                {visibleColumns.city && <Td>{entry.city}</Td>}
                {visibleColumns.pincode && <Td>{entry.pincode}</Td>}
                {visibleColumns.designation && <Td>{entry.designation}</Td>}
                <Td>
                  <IconButton onClick={() => handleEdit(id, entry)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(id)}>
                    <FaTrash />
                  </IconButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="9">No data available</Td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <PaginationWrapper>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </PaginationWrapper>
    </>
  );
};

export default TableComponent;
