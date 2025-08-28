import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-20">
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

        <section id="Testimonials" className="py-20 bg-gray-100 container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">Testimonials</h2>
          <Testimonials />
        </section>

        <section id="contact" className="py-20 container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
          <Contact />
        </section>
      </main>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot />
      </div>
    </div>
  );
}