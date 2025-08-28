import { motion } from "framer-motion";
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
        <img src={heroBg} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay"></div>

        <motion.div className="relative z-10 px-6 max-w-3xl" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Expert Physiotherapy for Pain Relief & Wellness
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Personalized treatments by Dr. Dipak Mirghe — precision care & rehabilitation.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <motion.a whileHover={{ scale: 1.03 }} href="#contact" className="px-6 py-3 rounded-full bg-blue-700 text-white btn-shadow">
              Book Appointment
            </motion.a>

            <motion.a whileHover={{ scale: 1.03 }} href="#contact" className="px-6 py-3 rounded-full bg-green-600 text-white btn-shadow">
              Request Callback
            </motion.a>
          </div>
        </motion.div>

        {/* floating action buttons */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
          <motion.a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-green-500 text-white p-3 rounded-full shadow-lg" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            💬
          </motion.a>
          <motion.a href="tel:+919876543210" className="bg-blue-700 text-white p-3 rounded-full shadow-lg" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }}>
            📞
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}