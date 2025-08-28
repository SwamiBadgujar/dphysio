import { useState } from "react";

export default function Chatbot(){
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <button onClick={() => setOpen(v=>!v)} aria-label="Open chat" className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
          💬
        </button>

        {open && (
          <div className="absolute bottom-14 right-0 w-72 bg-white rounded-xl shadow-lg p-4">
            <div className="text-sm font-semibold mb-2">Hello! Need help?</div>
            <p className="text-xs text-gray-600 mb-3">Type a message and we'll get back to you.</p>
            <input placeholder="Type message..." className="w-full p-2 border rounded mb-2 text-sm" />
            <div className="flex justify-end">
              <button className="px-3 py-1 bg-blue-700 text-white rounded">Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}