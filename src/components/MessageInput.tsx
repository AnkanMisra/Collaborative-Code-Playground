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
    <div className="mt-4 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg
                     border border-gray-600 focus:border-blue-500 focus:ring-1 
                     focus:ring-blue-500 outline-none transition-all
                     placeholder-gray-400 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
                     hover:bg-blue-700 active:bg-blue-800 transition-colors
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