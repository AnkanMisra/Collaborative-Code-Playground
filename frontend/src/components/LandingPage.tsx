import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-white mb-4">
          Code<span className="text-blue-500">Play</span>
        </h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
          Real-time collaborative coding environment with integrated chat. Perfect for pair programming and code reviews.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/editor')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium
                     hover:bg-blue-700 transition-all transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Start Coding
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-16 text-gray-400">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Real-time Collaboration</h3>
            <p>Code together in real-time with your team</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Integrated Chat</h3>
            <p>Discuss your code with built-in chat</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Code Editor</h3>
            <p>Feature-rich Monaco editor with syntax highlighting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;