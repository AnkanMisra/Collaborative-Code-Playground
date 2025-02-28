import MessageInput from './MessageInput';

interface ChatAreaProps {
  messages: string[];
  onSendMessage: (message: string) => void;
}

const ChatArea = ({ messages, onSendMessage }: ChatAreaProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto rounded-lg bg-gray-800 p-4">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className="mb-4 p-3 bg-gray-700 rounded-lg text-white"
          >
            {msg}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
};

export default ChatArea;