import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div className="container mx-auto px-6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-center text-2xl font-bold mb-3">About Dr. Dipak Mirghe</h2>
        <p className="text-gray-700 text-sm">
          Dr. Dipak Mirghe has years of experience in physiotherapy, offering world-class treatments for pain relief,
          injury recovery, and overall wellness. His approach combines advanced techniques with compassionate care.
        </p>
      </div>
    </motion.div>
  );
}