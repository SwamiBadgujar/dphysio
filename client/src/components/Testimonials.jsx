import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohit S.",
      feedback:
        "Dr. Dipak Mirghe is an excellent physiotherapist! His treatments really helped me recover quickly after my knee injury.",
    },
    {
      name: "Sneha P.",
      feedback:
        "I had chronic back pain for years. After treatment here, I feel so much better. The care and expertise are unmatched.",
    },
    {
      name: "Amit K.",
      feedback:
        "Very professional and compassionate approach. I highly recommend Mangalam Physiotherapy to anyone needing recovery.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our Patients Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">
                “{testimonial.feedback}”
              </p>
              <h3 className="text-lg font-semibold text-blue-600">
                - {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}