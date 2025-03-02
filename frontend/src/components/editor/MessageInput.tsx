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
    <div className="p-3 bg-[#1E293B]/50 border-t border-[#3B82F6]/10">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-[#1E293B]/70 text-white px-4 py-2.5 rounded-lg
                   border border-[#3B82F6]/20 focus:border-[#3B82F6]/40 focus:outline-none
                   placeholder-gray-400 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-[#3B82F6] text-white p-2.5 rounded-lg
                   hover:bg-[#2563EB] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center"
          aria-label="Send message"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;