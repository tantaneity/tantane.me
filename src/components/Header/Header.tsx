import React from 'react';
import './Header.css';

interface HeaderProps {
  username: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ username, className = '' }) => {
  return (
    <header className={`header ${className}`}>
      <h1 className="header-title">
        <span className="header-username">{username}</span>
      </h1>
    </header>
  );
};

export default Header;
