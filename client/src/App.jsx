import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChatBot from './components/chatbot.jsx'; // ✅ matches default export

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;