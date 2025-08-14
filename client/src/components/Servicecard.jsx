import React from 'react';

const ServiceCard = ({ title, description }) => {
  return (
    <div style={{
      background: '#f4f4f4', padding: '1rem', borderRadius: '8px', textAlign: 'center'
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;