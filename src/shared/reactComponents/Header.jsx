import React from 'react';
import { Link } from 'react-router';

const Header = function Header() {
  const headerStyle = {
    fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
    maxWidth: '95%',
    padding: '.3em',
    textAlign: 'center',
    opacity: '1',
    textDecoration: 'none',
    outline: 'none',
    border: 'none',
  };
  return (
    <header id="header">
      <h1 style={headerStyle}><Link to={'/'}>Social, not Social</Link></h1>
    </header>
  );
};

module.exports = Header;
