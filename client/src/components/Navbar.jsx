import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Mangalam Physiotherapy</h2>
      <div style={styles.links}>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between',
    padding: '1rem 2rem', background: '#2c3e50', color: '#fff'
  },
  logo: { margin: 0 },
  links: { display: 'flex', gap: '1rem' }
};

export default Navbar;