import React from "react";
import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "purple",
        padding: "15px 20px",
        width: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
    >
      <nav style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "30px",
            padding: "0",
            margin: "0",
          }}
        >
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" style={linkStyle}>
              Ogłoszenia
            </Link>
          </li>
          <li>
            <Link to="/create-post" style={linkStyle}>
              Dodaj ogłoszenie
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
};

export default Header;
