import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

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
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background-color: ${(props) => (props.active ? "#007bff" : "#f4f4f4")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#eaeaea")};
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 20px auto;
  }
`;

const FormGroup = styled.div`
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-collapse: collapse;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f4f4f4;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
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

const Heading = styled.h2`
  text-align: center;
  margin: 30px 0;
  color: #007bff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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
  const [editId, setEditId] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // For tab switching

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
    const servicesRef = ref(database, "homeServices");
    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val() ? Object.entries(snapshot.val()) : [];
      setServicesData(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "designation" && value === "Other") {
      setShowOtherInput(true);
    } else {
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

    if (editId) {
      const updateRef = ref(database, `homeServices/${editId}`);
      update(updateRef, newEntry).then(() => {
        alert("Data updated successfully");
        resetForm();
      });
    } else {
      push(dbRef, newEntry).then(() => {
        alert("Data saved successfully");
        resetForm();
      });
    }
  };

  const resetForm = () => {
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
    setEditId(null);
  };

  const handleDelete = (id) => {
    const deleteRef = ref(database, `homeServices/${id}`);
    remove(deleteRef).then(() => {
      alert("Data deleted successfully");
    });
  };

  const handleEdit = (id, entry) => {
    setEditId(id);
    setFormData(entry);
    if (entry.designation === "Other") {
      setShowOtherInput(true);
    }
  };

  return (
    <div>
      <Heading>UCLAP-IT</Heading>
      <p style={{ textAlign: "center", color: "#333" }}>
        U clap for home services
      </p>

      {/* Tabs */}
      <TabContainer>
        <TabButton
          active={activeTab === "form"}
          onClick={() => setActiveTab("form")}
        >
          Form
        </TabButton>
        <TabButton
          active={activeTab === "table"}
          onClick={() => setActiveTab("table")}
        >
          Table
        </TabButton>
      </TabContainer>

      {activeTab === "form" && (
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
          <Button type="submit">{editId ? "Update" : "Save"}</Button>
        </Form>
      )}

      {activeTab === "table" && (
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
      )}
    </div>
  );
};

export default HomeServicesForm;
