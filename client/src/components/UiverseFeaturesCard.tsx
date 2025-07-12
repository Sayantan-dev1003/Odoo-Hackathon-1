import React from 'react';

interface UiverseFeaturesCardProps {
  children: React.ReactNode;
}

const UiverseFeaturesCard: React.FC<UiverseFeaturesCardProps> = ({ children }) => {
  return (
    <div className="card hover-lift group cursor-pointer">
      <div className="content group-hover:scale-105 transition-transform duration-500">
        {children}
      </div>
    </div>
  );
};

export default UiverseFeaturesCard; 