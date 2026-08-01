import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // React Router Link
import heroBg from "../assets/knee-pain-physiotherapy-clinic.jpg"; // ensure exists

export default function Hero() {
  return (
    <section id="home">
      <motion.div
        className="relative h-[78vh] md:h-screen flex items-center justify-center text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        {/* Background Image */}
        <img src={heroBg} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay"></div>

        {/* Hero Text */}
        <motion.div
          className="relative z-10 px-6 max-w-3xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Expert Physiotherapy for Pain Relief & Wellness
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Personalized treatments by Dr. Dipak Mirghe — precision care & rehabilitation.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {/* Book Appointment Button with React Router Link */}
            <Link
              to="/appointment"
              className="px-6 py-3 rounded-full bg-blue-700 text-white btn-shadow hover:scale-105 transition transform"
            >
              Book Appointment
            </Link>

            {/* Request Callback Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#contact"
              className="px-6 py-3 rounded-full bg-green-600 text-white btn-shadow hover:scale-105 transition transform"
            >
              Request Callback
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}