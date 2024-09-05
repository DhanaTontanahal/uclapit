import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import styled from "styled-components";

// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyADqhVlMei6dJ5rdUlJoidqsvu6soR2GfQ",
  authDomain: "uclapit.firebaseapp.com",
  projectId: "uclapit",
  storageBucket: "uclapit.appspot.com",
  messagingSenderId: "469784870126",
  appId: "1:469784870126:web:6c3c18e9b41ebb7ea507ff",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Styled Components
const Form = styled.form`
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

const HomeServicesForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    alternateContact: "",
    area: "",
    city: "",
    pincode: "",
    designation: "",
    newDesignation: "",
  });

  const [servicesData, setServicesData] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);

  // Initial designation options
  const designationOptions = [
    "Carpenter",
    "Electrician",
    "Bathroom Cleaning",
    "Kitchen Cleaning",
    "Driver",
    "Mechanic",
    "Cloth Washer",
    "Painter",
    "Maid",
    "Housekeeping",
    "Baby Sitter",
    "Other",
  ];

  useEffect(() => {
    // Fetch saved data from Firebase
    const servicesRef = ref(database, "homeServices");
    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val() ? Object.values(snapshot.val()) : [];
      setServicesData(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "designation" && value === "Other") {
      setShowOtherInput(true);
    } else if (name === "designation") {
      setShowOtherInput(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(database, "homeServices");
    const newEntry = {
      ...formData,
      designation: showOtherInput
        ? formData.newDesignation
        : formData.designation,
    };

    push(dbRef, newEntry)
      .then(() => {
        alert("Data saved successfully");
        setFormData({
          name: "",
          contact: "",
          alternateContact: "",
          area: "",
          city: "",
          pincode: "",
          designation: "",
          newDesignation: "",
        });
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
        alert("Error saving data");
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>U Clap It - Services</h3>
      <Form onSubmit={handleSubmit}>
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
            {designationOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
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
      </Form>

      {/* Display saved data in a table */}
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
          </tr>
        </thead>
        <tbody>
          {servicesData.length > 0 ? (
            servicesData.map((entry, index) => (
              <tr key={index}>
                <Td>{entry.name}</Td>
                <Td>{entry.contact}</Td>
                <Td>{entry.alternateContact}</Td>
                <Td>{entry.area}</Td>
                <Td>{entry.city}</Td>
                <Td>{entry.pincode}</Td>
                <Td>{entry.designation}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="7">No data available</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default HomeServicesForm;
