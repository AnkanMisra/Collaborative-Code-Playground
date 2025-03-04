import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import ChatArea from "../chat/ChatArea";
import EditorBackground from "../common/Background/EditorBackground";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";


interface EditorProps {
  socket: Socket;
  connected: boolean;
}

const Editor = ({ socket, connected }: EditorProps) => {
  const navigate = useNavigate();
  const [chat, setChat] = useState<string[]>([]);
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const handleMessage = (data: string) => {
      console.log("Received message:", data);
      setChat(prevChat => [...prevChat, data]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const sendMessage = (message: string) => {
    if (message.trim() && connected) {
      console.log("Sending message:", message);
      socket.emit("message", message);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (connected) {
      socket.emit("language-change", newLanguage);
    }
  };

  useEffect(() => {
    const handleLanguageChange = (newLanguage: string) => {
      setLanguage(newLanguage);
    };

    socket.on("language-change", handleLanguageChange);

    return () => {
      socket.off("language-change", handleLanguageChange);
    };
  }, [socket]);


  const formatCode = () => {
    console.log("Formatting code...");
    const formattedCode = code
      .split('\n')
      .map(line => line.trim())
      .join('\n');

    setCode(formattedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1E] to-[#111827] overflow-hidden">

      <EditorBackground />
      <div className="relative z-10">
        <div className="w-full backdrop-blur-md bg-[#1E293B]/20 border-b border-[#3B82F6]/20 py-3 px-6 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] p-2 rounded-md flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">&lt;/&gt;</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                CodePlay Editor
              </h1>
              {connected ? (
                <div className="ml-3 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Connected
                </div>
              ) : (
                <div className="ml-3 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-medium border border-red-500/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  Disconnected
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E293B]/50 text-white/90 rounded-lg
                       hover:bg-[#1E293B]/80 transition-all duration-200 text-sm font-medium border border-[#3B82F6]/10
                       shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>


        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-[#1E293B]/30 rounded-xl border border-[#3B82F6]/10 overflow-hidden backdrop-blur-md shadow-xl">
              <div className="px-4 py-2.5 bg-[#1E293B]/70 border-b border-[#3B82F6]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-white/90 text-sm font-medium">Code Editor</span>
                </div>

                <div className="flex items-center gap-3">
                  <LanguageSelector
                    currentLanguage={language}
                    onLanguageChange={handleLanguageChange}
                  />

                  <button
                    onClick={formatCode}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#3B82F6]/20 text-white/90 rounded-md
                             hover:bg-[#3B82F6]/30 transition-all duration-200 text-sm font-medium border border-[#3B82F6]/20"
                  >
                    <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l3-3 3 3M9 7l3 3 3-3" />
                    </svg>
                    Format
                  </button>
                </div>
              </div>
              <CodeEditor code={code} language={language} onChange={setCode} />
            </div>
            <div className="bg-[#1E293B]/30 rounded-xl border border-[#3B82F6]/10 overflow-hidden backdrop-blur-md shadow-xl">
              <div className="px-4 py-2.5 bg-[#1E293B]/70 border-b border-[#3B82F6]/10 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8z" />
                </svg>
                <span className="text-white/90 text-sm font-medium">Chat</span>
              </div>
              <ChatArea messages={chat} onSendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
