import React from "react";
import styled from "styled-components";
import { FaUser, FaBars } from "react-icons/fa";

const HeaderWrapper = styled.header`
  background-color: #007bff;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AppTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Header = ({ toggleSidebar }) => (
  <HeaderWrapper>
    <AppTitle>UCLAP-IT</AppTitle>
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaBars
        style={{ fontSize: "24px", cursor: "pointer", marginRight: "15px" }}
        onClick={toggleSidebar}
      />
      <FaUser style={{ fontSize: "24px", cursor: "pointer" }} />
    </div>
  </HeaderWrapper>
);

export default Header;
