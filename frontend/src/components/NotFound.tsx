import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#3B82F6] text-9xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold text-white mb-4 font-['Roboto_Condensed']">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#1E293B]/50 text-white rounded-lg hover:bg-[#1E293B]/80 
                   transition-all duration-200 border border-[#3B82F6]/20 font-medium tracking-wide
                   flex items-center gap-2 mx-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;