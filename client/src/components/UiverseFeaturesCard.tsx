import React from 'react';
import '@/styles/UiverseFeaturesCard.css';

interface UiverseFeaturesCardProps {
  children: React.ReactNode;
}

const UiverseFeaturesCard: React.FC<UiverseFeaturesCardProps> = ({ children }) => {
  return (
    <div className="card">
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default UiverseFeaturesCard; 