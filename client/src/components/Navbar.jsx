import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // <-- import Link
import logo from "../assets/Logo.png"; // ensure file exists

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-md"
    >
      <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
        {/* Logo + Brand wrapped in Link to home */}
        <Link to="/" className="flex items-center gap-1">
          <img
            src={logo}
            alt="logo"
            className="h-20 w-20 md:h-20 md:w-20 lg:h-30 lg:w-28 object-contain"
          />
          <div className="leading-tight">
            <span className="block font-bold text-blue-900 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              MANGALAM
            </span>
            <span className="block text-blue-900 text-sm sm:text-base md:text-lg lg:text-xl">
              Advanced Physiotherapy & Rehabilation Center
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 items-center">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className="text-gray-700 text-base md:text-lg hover:text-blue-700 transition"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {l.label}
            </motion.a>
          ))}

          {/* Book button navigates to /appointment */}
          <Link
            to="/appointment"
            className="ml-3 px-5 py-2.5 rounded-full bg-blue-700 text-white font-medium shadow-md hover:bg-blue-800 transition"
          >
            Book
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          className="md:hidden bg-white shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="px-6 py-5 space-y-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-gray-700 text-lg py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}

            {/* Mobile Book Appointment button */}
            <Link
              to="/appointment"
              className="inline-block mt-3 px-5 py-2.5 bg-blue-700 text-white rounded-full text-lg shadow-md hover:bg-blue-800 transition"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}