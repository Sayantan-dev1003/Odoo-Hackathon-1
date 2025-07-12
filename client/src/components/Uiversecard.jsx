import React from 'react';
import './UiverseFeaturesCard.css';

const UiverseFeaturesCard = ({ children }) => {
  return (
    <div className="card">
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default UiverseFeaturesCard;
