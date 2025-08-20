import React, { useState } from 'react';
import './Card.css';

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  expandable?: boolean;
  defaultExpanded?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  expandable = false, 
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const handleHeaderClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  const shouldShowContent = isExpanded || !expandable;

  return (
    <div className={`card ${expandable ? 'expandable' : ''}`}>
      {title && (
        <div 
          className="card-header" 
          onClick={handleHeaderClick}
          style={{ cursor: expandable ? 'pointer' : 'default' }}
        >
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className={`card-content ${shouldShowContent ? 'expanded' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
