import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#2c3e50', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <p>© {new Date().getFullYear()} Mangalam Physiotherapy | Dr. Dipak Mirghe</p>
    </footer>
  );
};

export default Footer;