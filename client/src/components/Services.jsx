// client/src/components/Services.jsx
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Import service images
import service1 from "../assets/Service1.png";
import service2 from "../assets/Service2.jpg";
import service3 from "../assets/Service3.png";
import service4 from "../assets/Service4.png";
import service5 from "../assets/Service5.png";

const services = [
  { title: "Neuro Physiotherapist", img: service1 },
  { title: "Ortho Physiotherapist", img: service2 },
  { title: "Pediatric Physiotherapist", img: service3 },
  { title: "Pre and Post Surgery Rehabilitation", img: service4 },
  { title: "Spinal Injury Physio", img: service5 },
];

export default function Services() {
  const rowRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const updateWidth = () => {
      const w = Math.ceil(el.getBoundingClientRect().width);
      if (w && w !== rowWidth) setRowWidth(w);
    };

    updateWidth();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateWidth);
      ro.observe(el);
    } else {
      window.addEventListener("resize", updateWidth);
      const imgs = el.querySelectorAll("img");
      imgs.forEach((img) => img.addEventListener("load", updateWidth));
    }

    return () => {
      if (ro) ro.disconnect();
      else {
        window.removeEventListener("resize", updateWidth);
        const imgs = el.querySelectorAll("img");
        imgs.forEach((img) => img.removeEventListener("load", updateWidth));
      }
    };
  }, []);

  const SPEED_FACTOR = 1.5;
  const duration = rowWidth
    ? Math.max(8, Math.round((rowWidth * 0.023) / SPEED_FACTOR))
    : 0;

  const ZIG_AMPLITUDE = 30; // vertical offset for zig-zag

  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Our <span className="text-blue-700">Specialities</span>
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Mangalam Physiotherapy offers expert treatments across multiple specialties.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={rowWidth ? { x: [0, -rowWidth] } : { x: 0 }}
          transition={
            rowWidth
              ? { repeat: Infinity, duration, ease: "linear" }
              : { duration: 0 }
          }
        >
          {[...Array(2)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={rowIndex === 0 ? rowRef : null}
              className="flex"
            >
              {services.map((service, i) => {
                const offsetIndex = i + rowIndex * services.length;
                const yOffset = offsetIndex % 2 === 0 ? -ZIG_AMPLITUDE : ZIG_AMPLITUDE;

                return (
                  <motion.div
                    key={`${rowIndex}-${i}`}
                    className="flex flex-col bg-white shadow-xl rounded-2xl overflow-hidden w-[300px] mx-4 flex-shrink-0 hover:scale-105 transition-transform duration-300"
                    animate={{ y: yOffset }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      yoyo: Infinity,
                    }}
                  >
                    {/* Image Container */}
                    <div className="w-full h-[220px] overflow-hidden">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Container */}
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {service.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}