import { useState } from "react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
}

const MessageInput = ({ sendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-[#1E293B]/30 border-t border-[#3B82F6]/10">
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="flex-1 bg-[#1E293B]/50 text-white px-4 py-3 rounded-lg
                     border border-[#3B82F6]/20 focus:border-[#3B82F6] focus:ring-1 
                     focus:ring-[#3B82F6] outline-none transition-all
                     placeholder-gray-400 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium
                     hover:bg-[#2563EB] active:bg-[#1D4ED8] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-sm flex items-center gap-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;