import React from "react";
import "./Header.css";
import stackline from '../../stackline_logo.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={stackline} className="stackline-logo" alt="Stackline-logo" />
    </header>
  );
};

export default Header;