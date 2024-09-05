import React from "react";
import styled from "styled-components";

const FormGroupContainer = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const FormGroup = ({ label, type, name, value, onChange, options }) => {
  return (
    <FormGroupContainer>
      <Label>{label}</Label>
      {type === "select" ? (
        <Select name={name} value={value} onChange={onChange} required>
          <option value="">Select a service</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </FormGroupContainer>
  );
};

export default FormGroup;
