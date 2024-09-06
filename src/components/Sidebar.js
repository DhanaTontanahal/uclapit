import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const SidebarWrapper = styled.nav`
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  left: ${(props) => (props.open ? "0" : "-100%")};
  top: 0;
  height: 100%;
  transition: left 0.3s ease;
`;

const SidebarLink = styled.a`
  color: white;
  font-size: 18px;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  &:hover {
    background-color: #007bff;
  }
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const Sidebar = ({ open, setActiveTab, setOpen }) => (
  <SidebarWrapper open={open}>
    <CloseIcon onClick={() => setOpen(false)} />
    <SidebarLink href="#" onClick={() => setActiveTab("form")}>
      Form
    </SidebarLink>
    <SidebarLink href="#" onClick={() => setActiveTab("table")}>
      Table
    </SidebarLink>
    <SidebarLink href="#" onClick={() => setActiveTab("managedesignation")}>
      Designation Manager
    </SidebarLink>
  </SidebarWrapper>
);

export default Sidebar;
