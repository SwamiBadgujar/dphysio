// client/src/components/About.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import doctorImg from "../assets/about.jpeg";
import clinicImg1 from "../assets/Clinic.jpeg";
import clinicImg2 from "../assets/Clinic2.jpeg";
import clinicImg3 from "../assets/Clinic3.jpeg";
import clinicImg4 from "../assets/Clinic4.jpeg";

// ✅ Auto-slide + Manual navigation
function ClinicSlider({ images, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <motion.div
      className="relative w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-md p-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Clinic view ${index + 1}`}
            className="w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 sm:p-2 shadow hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 sm:p-2 shadow hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
      </button>

      {/* Dots */}
      <div className="flex space-x-2 mt-3 sm:mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition ${
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
      id="about"
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* 🏷 About Us Title */}
      <div className="text-center py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          About <span className="text-blue-700">Us</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mt-2">
          Know more about our Doctor and Clinic
        </p>
      </div>

      {/* 👨‍⚕️ Doctor Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Doctor Image */}
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-md p-3">
              <img
                src={doctorImg}
                alt="Dr. Deepak Bhanudas Mirghe"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Doctor Info */}
          <motion.div
            className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg text-center md:text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
                <span className="block text-blue-700 mb-1">Meet</span>
                <span className="block text-gray-800 font-extrabold text-3xl sm:text-4xl">
                  Dr. Deepak Bhanudas Mirghe
                </span>
              </h2>
              <p className="text-blue-600 font-medium mt-2 text-sm sm:text-lg">
                (BPTH, COMT, MIAP, Fellowship in Neuro Rehabilitation)
              </p>
            </div>

            {/* Description */}
            <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4 text-justify md:text-left">
              <p>
                Dr. Deepak Mirghe is a highly skilled physiotherapist with{" "}
                <span className="font-semibold">over years of experience</span> in
                musculoskeletal rehabilitation, sports physiotherapy, neuro rahabilitation and pain management.
              </p>
              <p>
                His <span className="font-semibold">patient-first approach</span> ensures
                personalized care, faster recovery, and long-term wellness for every patient.
              </p>

              <div className="pt-3">
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Orthopedic & Sports Physiotherapy Expert</li>
                  <li>✅ Certified in Manual Therapy (COMT)</li>
                  <li>✅ Member of Indian Association of Physiotherapists (MIAP)</li>
                  <li>✅ Fellowship in Neuro Rehabilitation</li>
                  <li>✅ Specialized in Post-surgical Care</li>
                  <li>✅ Passionate about Patient Education</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🌊 Divider */}
      <svg
        className="w-full h-16 text-blue-50"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,224L48,218.7C96,213,192,203,288,202.7C384,203,480,213,576,197.3C672,181,768,139,864,149.3C960,160,1056,224,1152,240C1248,256,1344,224,1392,208L1440,192V320H0Z"
        ></path>
      </svg>

      {/* 🏥 Clinic Section */}
      <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Clinic Info */}
          <motion.div
            className="order-2 md:order-1 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
              About <span className="text-blue-700">Mangalam Physiotherapy Clinic</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 text-justify md:text-left">
              At Mangalam Physiotherapy, we provide{" "}
              <span className="font-semibold">holistic and advanced care</span>. Our modern
              facilities and patient-focused approach ensure comfort and effective recovery.
            </p>
            <ul className="space-y-2 text-gray-700 text-base sm:text-lg">
              <li>🏥 Modern Rehabilitation Facilities</li>
              <li>🤝 Personalized Treatment Plans</li>
              <li>💡 Evidence-based Therapies</li>
              <li>🌍 Convenient Location</li>
              <li>🕒 Flexible Appointments</li>
            </ul>
          </motion.div>

          {/* Clinic Slider */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
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