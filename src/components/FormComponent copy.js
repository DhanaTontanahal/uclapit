import React from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const FormComponent = ({
  formData,
  handleChange,
  handleSubmit,
  showOtherInput,
  designations, // Pass designations array as prop
}) => (
  <FormWrapper onSubmit={handleSubmit}>
    <FormGroup>
      <Label>Name:</Label>
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label>Contact:</Label>
      <Input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label>Alternate Contact:</Label>
      <Input
        type="text"
        name="alternateContact"
        value={formData.alternateContact}
        onChange={handleChange}
      />
    </FormGroup>
    <FormGroup>
      <Label>Area:</Label>
      <Input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label>City:</Label>
      <Input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label>Pincode:</Label>
      <Input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label>Designation:</Label>
      <Select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        required
      >
        <option value="">Select a service</option>
        {designations.map((designation, index) => (
          <option key={index} value={designation}>
            {designation}
          </option>
        ))}
      </Select>
    </FormGroup>
    {showOtherInput && (
      <FormGroup>
        <Label>Enter New Designation:</Label>
        <Input
          type="text"
          name="newDesignation"
          value={formData.newDesignation}
          onChange={handleChange}
          required={showOtherInput}
        />
      </FormGroup>
    )}
    <Button type="submit">Save</Button>
  </FormWrapper>
);

export default FormComponent;
