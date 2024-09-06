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
import Header from "./Header";
import Sidebar from "./Sidebar";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
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

// Main Layout
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const HomeServices = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState("form");

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
  const [activeTab, setActiveTab] = useState("form");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleSidebar = () => setMenuOpen(!menuOpen);

  return (
    <Layout>
      {/* Sidebar */}
      {/* <Sidebar open={menuOpen} setActiveTab={setActiveTab} /> */}
      <Sidebar
        open={menuOpen}
        setOpen={setMenuOpen}
        setActiveTab={setActiveTab}
      />

      {/* Main content area */}
      <div style={{ flexGrow: 1 }}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <MainContent>
          {activeTab === "form" && (
            <FormComponent
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showOtherInput={showOtherInput}
              designations={designationOptions} // Passing designation options to FormComponent
            />
          )}

          {activeTab === "table" && (
            <TableComponent
              servicesData={servicesData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </MainContent>
      </div>
    </Layout>
  );
};

export default HomeServices;
