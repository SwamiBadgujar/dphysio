import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
    { label: "Appointment", href: "/appointment" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // close mobile menu
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // Already on home → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home route
      navigate("/");
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo + Clinic Name */}
        <button onClick={handleHomeClick} className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 object-contain drop-shadow-md"
          />
          <div className="flex flex-col leading-tight text-left">
            <span className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide uppercase">
              MANGALAM
            </span>
            <span className="text-lg md:text-xl font-semibold text-blue-600">
              Physiotherapy Center
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) =>
            link.label === "Home" ? (
              <button
                key={link.label}
                onClick={handleHomeClick}
                className="relative text-gray-700 font-medium text-lg hover:text-blue-600 transition duration-200 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : link.href.startsWith("#") ? (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href.substring(1))}
                className="relative text-gray-700 font-medium text-lg hover:text-blue-600 transition duration-200 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-gray-700 font-medium text-lg hover:text-blue-600 transition duration-200 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}

          {/* Doctor Login button */}
          <Link
            to="/doctor/login"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          >
            Doctor Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 shadow-lg"
        >
          <div className="flex flex-col space-y-4 p-6">
            {links.map((link) =>
              link.label === "Home" ? (
                <button
                  key={link.label}
                  onClick={handleHomeClick}
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg text-left"
                >
                  {link.label}
                </button>
              ) : link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => handleScroll(link.href.substring(1))}
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg text-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Doctor Login button */}
            <Link
              to="/doctor/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Doctor Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}