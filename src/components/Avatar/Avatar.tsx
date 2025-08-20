import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 120 }) => {
  return (
    <div className="avatar-container">
      <img 
        src={src} 
        alt={alt} 
        className="avatar-image"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Avatar;
