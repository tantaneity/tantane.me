import React from 'react';
import { useDynamicBackground } from '../../hooks/useDynamicBackground';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  useDynamicColors?: boolean;
  avatarSrc?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, useDynamicColors = false, avatarSrc }) => {
  useDynamicBackground(useDynamicColors ? avatarSrc : undefined);

  return (
    <div className="layout">
      <div className={`background-gradient ${useDynamicColors ? 'dynamic' : ''}`}></div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
