import React, { useState } from 'react';
import { sendContactForm } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactForm(form);
      setStatus('Message sent successfully!');
    } catch {
      setStatus('Error sending message');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '3rem', textAlign: 'center', background: '#ecf0f1' }}>
        <h1>Mangalam Physiotherapy</h1>
        <h2>Dr. Dipak Mirghe</h2>
        <p>Expert care for your health & wellness</p>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '3rem' }}>
        <h2>About Us</h2>
        <p>Dr. Dipak Mirghe has years of experience in physiotherapy, offering world-class treatments for pain relief, injury recovery, and overall wellness.</p>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '3rem', background: '#ecf0f1' }}>
        <h2>Our Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <ServiceCard title="Back Pain Therapy" description="Relief from chronic and acute back pain." />
          <ServiceCard title="Sports Injury Rehab" description="Recovery plans for sports injuries." />
          <ServiceCard title="Post-Surgery Rehab" description="Supportive care after surgeries." />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '3rem' }}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
          <input name="name" placeholder="Your Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" onChange={handleChange} required />
          <button type="submit">Send</button>
        </form>
        {status && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{status}</p>}
      </section>
    </div>
  );
};

export default Home;