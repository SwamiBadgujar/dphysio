import { motion } from "framer-motion";
import doctorImg from "../assets/about.jpeg"; // make sure this path is correct

export default function About() {
  return (
    <motion.section
      className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Doctor Image */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={doctorImg}
            alt="Dr. Deepak Bhanudas Mirghe"
            className="rounded-2xl shadow-2xl w-full h-[600px] object-contain bg-white p-3"
          />
        </motion.div>

        {/* Doctor Info */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Dr. Deepak Bhanudas Mirghe
          </h2>
          <p className="text-xl text-blue-700 font-semibold mb-6">
            (BPTH, COMT, MIAP)
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Dr. Deepak Mirghe is a highly skilled physiotherapist with {" "}
            <span className="font-semibold"> years of experience</span> in
            musculoskeletal rehabilitation, sports physiotherapy, and pain
            management. His approach blends modern evidence-based practices with
            compassionate care, ensuring patients recover faster and maintain
            long-term wellness.
          </p>

          <ul className="space-y-3 text-gray-700 text-lg">
            <li>✅ Expertise in Orthopedic & Sports Physiotherapy</li>
            <li>✅ Certified in Manual Therapy (COMT)</li>
            <li>✅ Member of Indian Association of Physiotherapists (MIAP)</li>
            <li>✅ Fellowship in NEURO REHABILITATION </li>
            <li>✅ Specialized in Post-surgical Rehabilitation</li>
            <li>✅ Passionate about Patient Education & Preventive Care</li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}