import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const SignIn = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect to editor if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/editor');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-block bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] p-3 rounded-md mb-4"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <span className="text-white text-2xl font-bold">&lt;/&gt;</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Sign in to CodePlay</h1>
          <p className="text-gray-400">Access collaborative coding environments</p>
        </div>
        
        <div className="bg-[#1E293B]/30 backdrop-blur-sm rounded-lg p-6 border border-[#3B82F6]/20">
          <ClerkSignIn signUpUrl="/sign-up" redirectUrl="/editor" />
        </div>
        
        <div className="mt-6 text-center">
          <motion.button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;