// src/components/Logo.jsx
import React from "react";
import logo from "../../assets/img/mongodb.svg"; // Ensure you have a logo image at this path

const Logo = ({ width = 10, height = 10}) => {
  return (
    <img
      src={logo}
      alt="Logo"
      width={width}
      height={height}
      className="object-contain"
    />
  );
};

export default Logo;
