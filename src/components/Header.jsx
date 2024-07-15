import React from 'react';
import './styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">ALURAFLIX</div>
      <nav className="nav">
        <button className="nav-button">HOME</button>
        <button className="nav-button">NUEVO VIDEO</button>
      </nav>
    </header>
  );
}

export default Header;
