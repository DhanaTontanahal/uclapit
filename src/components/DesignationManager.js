import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-modal";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

// Styling
const Button = styled.button`
  padding: 10px 15px;
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

const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const DesignationManager = () => {
  const [designations, setDesignations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newDesignation, setNewDesignation] = useState("");
  const [editingDesignation, setEditingDesignation] = useState(null);
  const db = getDatabase(); // Initialize Realtime Database

  // Fetch designations
  useEffect(() => {
    const designationsRef = ref(db, "designations");
    onValue(designationsRef, (snapshot) => {
      const data = snapshot.val();
      const designationList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
          }))
        : [];
      setDesignations(designationList);
    });
  }, [db]);

  // Add or edit designations
  const handleSaveDesignation = async () => {
    const designationsRef = ref(db, "designations");

    if (editingDesignation) {
      // Update the existing designation
      const updates = {};
      updates[`/designations/${editingDesignation.id}/name`] = newDesignation;
      await update(ref(db), updates);
      setDesignations((prev) =>
        prev.map((d) =>
          d.id === editingDesignation.id ? { ...d, name: newDesignation } : d
        )
      );
    } else {
      // Add new designation
      const newDesignationRef = push(designationsRef);
      await set(newDesignationRef, { name: newDesignation });
      setDesignations([
        ...designations,
        { id: newDesignationRef.key, name: newDesignation },
      ]);
    }

    setNewDesignation("");
    setModalIsOpen(false);
  };

  // Delete designation
  const handleDeleteDesignation = async (designationId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this designation?`
    );
    if (confirmDelete) {
      const designationRef = ref(db, `designations/${designationId}`);
      await remove(designationRef);
      setDesignations(designations.filter((d) => d.id !== designationId));
    }
  };

  return (
    <>
      <h2>Designation Manager</h2>
      <Button onClick={() => setModalIsOpen(true)}>Add Designation</Button>
      <ul>
        {designations.map((designation) => (
          <ListItem key={designation.id}>
            {designation.name}
            <div>
              <AiFillEdit
                onClick={() => {
                  setEditingDesignation(designation);
                  setNewDesignation(designation.name);
                  setModalIsOpen(true);
                }}
                style={{ cursor: "pointer", marginRight: "10px" }}
              />
              <AiFillDelete
                onClick={() => handleDeleteDesignation(designation.id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </ListItem>
        ))}
      </ul>

      {/* Modal for adding/editing designations */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>{editingDesignation ? "Edit Designation" : "Add Designation"}</h2>
        <input
          type="text"
          value={newDesignation}
          onChange={(e) => setNewDesignation(e.target.value)}
        />
        <Button onClick={handleSaveDesignation}>
          {editingDesignation ? "Update" : "Add"}
        </Button>
        <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
      </Modal>
    </>
  );
};

export default DesignationManager;
