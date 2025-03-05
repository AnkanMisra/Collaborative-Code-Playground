import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useUser();
  const from = location.state?.from || '/';

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true });
    }
  }, [isSignedIn, navigate, from]);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-8">
          <motion.div
            className="inline-block bg-gradient-to-br from-[#EF4444] to-[#F87171] p-3 rounded-md mb-4"
            animate={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 1, repeat: Infinity, repeatDelay: 2 }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need to sign in to access this page</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#1E293B]/50 text-white rounded-md hover:bg-[#1E293B]/80 transition-colors border border-[#3B82F6]/20 w-full sm:w-auto"
            >
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
