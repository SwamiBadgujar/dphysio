import { motion } from "framer-motion";

const cards = [
  { title: "Back Pain Therapy", text: "Relief from chronic and acute back pain." },
  { title: "Sports Injury Rehab", text: "Recovery plans for sports injuries." },
  { title: "Post-Surgery Rehab", text: "Supportive care after surgeries." },
];

export default function Services() {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div key={c.title} className="bg-white p-6 rounded-lg shadow" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }}>
            <h4 className="font-bold text-sm">{c.title}</h4>
            <p className="text-xs text-gray-600 mt-2">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}