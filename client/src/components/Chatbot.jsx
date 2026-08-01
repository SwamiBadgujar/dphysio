import { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 Need help? Ask us anything." },
  ]);
  const [input, setInput] = useState("");
  const panelRef = useRef(null);

  // Close chat when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    // Simple auto-reply (static demo — wire to /api/ai later if needed)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! Our team will get back to you shortly. You can also call us at +91 77448 98939.",
        },
      ]);
    }, 700);
  };

  return (
    <div className="relative flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[100]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRobot className="text-white" size={20} />
              <div>
                <p className="font-semibold text-sm leading-tight">
                  Mangalam Assistant
                </p>
                <p className="text-[11px] text-blue-100">Online • replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/90 hover:text-white hover:bg-white/10 rounded-full p-1 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed break-words ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="px-3 py-2 border-t border-gray-200 flex items-center gap-2 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-full hover:bg-blue-800 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="flex flex-col items-center gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/917744898939"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
        >
          💬
        </a>

        {/* Call */}
        <a
          href="tel:+917744898939"
          aria-label="Call us"
          title="Call us"
          className="bg-blue-700 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
        >
          📞
        </a>

        {/* Chatbot toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chatbot" : "Open chatbot"}
          title={open ? "Close chatbot" : "Open chatbot"}
          className={`bg-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform ${
            open ? "rotate-45" : ""
          }`}
        >
          <FaRobot size={20} />
        </button>
      </div>
    </div>
  );
}

