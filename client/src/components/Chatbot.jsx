import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa'; // Using react-icons

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m your assistant. Want to book an appointment?' },
  ]);
  const [input, setInput] = useState('');
  const [appointment, setAppointment] = useState({ name: '', phone: '', date: '', time: '', reason: '' });
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const chatContainerRef = useRef(null);

  const steps = [
    'What is your full name?',
    'What is your phone number?',
    'What date would you like to visit? (YYYY-MM-DD)',
    'Preferred time?',
    'Reason for appointment?',
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    let newMessages = [...messages, { from: 'user', text: trimmedInput }];
    let newAppointment = { ...appointment };

    switch (step) {
      case 0: newAppointment.name = trimmedInput; break;
      case 1: newAppointment.phone = trimmedInput; break;
      case 2: newAppointment.date = trimmedInput; break;
      case 3: newAppointment.time = trimmedInput; break;
      case 4:
        newAppointment.reason = trimmedInput;
        try {
          await axios.post('http://localhost:5002/appointments', newAppointment);
          newMessages.push({ from: 'bot', text: 'Your appointment has been booked! ✅' });
        } catch (err) {
          console.error('Appointment booking failed:', err);
          newMessages.push({ from: 'bot', text: 'Sorry, something went wrong. Please try again later.' });
        }
        setMessages(newMessages);
        setInput('');
        setStep(0);
        setAppointment({ name: '', phone: '', date: '', time: '', reason: '' });
        return;
      default: break;
    }

    newMessages.push({ from: 'bot', text: steps[step + 1] || '' });
    setAppointment(newAppointment);
    setMessages(newMessages);
    setStep(step + 1);
    setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#0084ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <FaRobot size={28} />
        </div>
      )}

      {open && (
        <div
          style={{
            width: '300px',
            background: '#f4f4f4',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#0084ff',
              color: '#fff',
              padding: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            ChatBot
            <span onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>✖️</span>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            style={{ height: '300px', overflowY: 'auto', padding: '5px', flex: 1 }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                <p
                  style={{
                    background: msg.from === 'user' ? '#0084ff' : '#e5e5ea',
                    color: msg.from === 'user' ? '#fff' : '#000',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    margin: '3px 0',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', padding: '5px', borderTop: '1px solid #ccc' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              placeholder="Type your answer..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: '#0084ff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}