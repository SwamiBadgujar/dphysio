// client/src/components/About.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import doctorImg from "../assets/about.jpeg";
import clinicImg1 from "../assets/clinic.jpeg";
import clinicImg2 from "../assets/Clinic2.jpeg";
import clinicImg3 from "../assets/Clinic3.jpeg";
import clinicImg4 from "../assets/Clinic4.jpeg";

// ✅ Auto-slide + Manual + Swipe
function ClinicSlider({ images, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.div
      className="relative w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Large image container with white frame */}
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-md p-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Clinic view ${index + 1}`}
            className="w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* Arrows (responsive size) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 md:p-2 shadow hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 md:p-2 shadow hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
      </button>

      {/* Dots */}
      <div className="flex space-x-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition ${
              i === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <motion.section
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* 👨‍⚕️ Doctor Section */}
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-100 min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Doctor Image */}
          <motion.div
            className="w-full flex justify-center order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-md p-4">
              <img
                src={doctorImg}
                alt="Dr. Deepak Bhanudas Mirghe"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Doctor Info */}
          <motion.div
            className="w-full order-2 bg-white/80 backdrop-blur-md rounded-2xl p-10 shadow-xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
              Meet <span className="text-blue-700">Dr. Deepak Bhanudas Mirghe</span>
            </h2>
            <p className="text-lg text-blue-600 font-medium mb-6">
              (BPTH, COMT, MIAP, Fellowship in Neuro Rehabilitation)
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Dr. Deepak Mirghe is a highly skilled physiotherapist with{" "}
              <span className="font-semibold">over 10 years of experience</span> in
              musculoskeletal rehabilitation, sports physiotherapy, and pain management.
              His patient-first approach ensures faster recovery and long-term wellness.
            </p>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>✅ Orthopedic & Sports Physiotherapy Expert</li>
              <li>✅ Certified in Manual Therapy (COMT)</li>
              <li>✅ Member of Indian Association of Physiotherapists (MIAP)</li>
              <li>✅ Fellowship in Neuro Rehabilitation</li>
              <li>✅ Specialized in Post-surgical Care</li>
              <li>✅ Passionate about Patient Education</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 🌊 Wave Divider */}
      <svg
        className="w-full h-20 text-blue-50"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,224L48,218.7C96,213,192,203,288,202.7C384,203,480,213,576,197.3C672,181,768,139,864,149.3C960,160,1056,224,1152,240C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* 🏥 Clinic Section */}
      <div className="relative bg-gradient-to-r from-blue-100 via-white to-blue-50 min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Clinic Info */}
          <motion.div
            className="w-full order-2 md:order-1 bg-white/80 backdrop-blur-md rounded-2xl p-10 shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              About <span className="text-blue-700">Mangalam Physiotherapy Clinic</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At Mangalam Physiotherapy, we provide{" "}
              <span className="font-semibold">holistic and advanced care</span>.
              Our modern facilities and patient-focused approach ensure comfort
              and effective recovery.
            </p>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>🏥 Modern Rehabilitation Facilities</li>
              <li>🤝 Personalized Treatment Plans</li>
              <li>💡 Evidence-based Therapies</li>
              <li>🌍 Convenient Location</li>
              <li>🕒 Flexible Appointments</li>
            </ul>
          </motion.div>

          {/* Clinic Slider */}
          <motion.div
            className="w-full flex justify-center order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ClinicSlider
              images={[clinicImg1, clinicImg2, clinicImg3, clinicImg4]}
              interval={3000}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}