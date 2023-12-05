import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 0',
  zIndex: 1000,
};

const navInnerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0 20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 10px',
};

const rightSectionStyle = {
  display: 'flex',
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid white',
  color: 'white',
  padding: '5px 10px',
  cursor: 'pointer',
  marginLeft: '10px',
};


const Navigation: React.FC = () => {
  return (
    <nav style={navStyle}>
      <div style={navInnerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <div style={rightSectionStyle}>
          <button style={buttonStyle}>Sign Up</button>
          <button style={buttonStyle}>Log In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
