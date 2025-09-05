// client/src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Testimonials from "./components/Testimonials";
import Appointment from "./components/Appointment";
import DoctorLogin from "./components/DoctorLogin";
import DoctorAppointments from "./components/DoctorAppointments";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("doctorToken") || "");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Navbar />

        <main className="flex-1 pt-20">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <section id="home" className="relative">
                    <Hero />
                  </section>

                  <section id="about" className="py-20 container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
                    <About />
                  </section>

                  <section id="services" className="py-20 bg-gray-100 container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
                    <Services />
                  </section>

                  <section id="testimonials" className="py-20 bg-gray-100 container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-10">Testimonials</h2>
                    <Testimonials />
                  </section>

                  <section id="contact" className="py-20 container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
                    <Contact />
                  </section>
                </>
              }
            />

            {/* Appointment Page */}
            <Route path="/appointment" element={<Appointment />} />

            {/* Doctor Login Page */}
            <Route path="/doctor/login" element={<DoctorLogin setToken={setToken} />} />

            {/* Doctor Dashboard (Protected) */}
            <Route
              path="/doctor"
              element={
                <ProtectedRoute>
                  <DoctorAppointments token={token} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />

        <div className="fixed bottom-6 right-6 z-50">
          <Chatbot />
        </div>
      </div>
    </Router>
  );
}