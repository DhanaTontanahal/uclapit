import React from "react";
import styled from "styled-components";

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

const Sidebar = ({ open, setActiveTab }) => (
  <SidebarWrapper open={open}>
    <SidebarLink href="#" onClick={() => setActiveTab("form")}>
      Form
    </SidebarLink>
    <SidebarLink href="#" onClick={() => setActiveTab("table")}>
      Table
    </SidebarLink>
  </SidebarWrapper>
);

export default Sidebar;
