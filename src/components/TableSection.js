// components/TableSection.js
import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
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
`;

const TableSection = ({ servicesData, handleEdit, handleDelete }) => (
  <Table>
    <thead>
      <tr>
        <Th>Name</Th>
        <Th>Contact</Th>
        <Th>Alternate Contact</Th>
        <Th>Area</Th>
        <Th>City</Th>
        <Th>Pincode</Th>
        <Th>Designation</Th>
        <Th>Actions</Th>
      </tr>
    </thead>
    <tbody>
      {servicesData.length > 0 ? (
        servicesData.map(([id, entry], index) => (
          <tr key={index}>
            <Td>{entry.name}</Td>
            <Td>{entry.contact}</Td>
            <Td>{entry.alternateContact}</Td>
            <Td>{entry.area}</Td>
            <Td>{entry.city}</Td>
            <Td>{entry.pincode}</Td>
            <Td>{entry.designation}</Td>
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
          <Td colSpan="8">No data available</Td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default TableSection;
