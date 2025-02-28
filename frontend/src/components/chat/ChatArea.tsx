import MessageInput from '../editor/MessageInput';

interface ChatAreaProps {
  messages: string[];
  onSendMessage: (message: string) => void;
}

const ChatArea = ({ messages, onSendMessage }: ChatAreaProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#3B82F6]/20 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className="p-4 bg-[#1E293B]/50 rounded-xl text-white border border-[#3B82F6]/10 
                     hover:bg-[#1E293B]/70 transition-all duration-200 shadow-lg
                     backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                <span className="text-sm font-medium text-[#3B82F6]">U</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3B82F6]">User</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">just now</span>
                </div>
                <p className="text-gray-200 leading-relaxed">{msg}</p>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#1E293B]/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">No messages yet</p>
            <p className="text-gray-500 text-sm">Start the conversation!</p>
          </div>
        )}
      </div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
};

export default ChatArea;