// components/Header.jsx
import React from "react";
import logoImage from "../images/algoforest-high-resolution-logo-transparent.png";
const Header = () => {
  return (
    <header className="header">
      <div className="title-container">
        <h1 className="title">AlgoForest</h1>
        {/* <p className="tagline">Explore. Learn. Visualize.</p> */}
      </div>
      <input type="text" className="search-bar" placeholder="Search Trees" />
      <nav>
        <a href="#">Login</a>
      </nav>
    </header>
  );
};

export default Header;
