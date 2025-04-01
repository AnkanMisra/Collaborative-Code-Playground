import { useSignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded]);


  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      if (signUp) {
        await signUp.create({ emailAddress: email, password });
        await signUp.prepareEmailAddressVerification();
        navigate('/verify-email'); // Redirect after sign-up//+
      } else {
        throw new Error('Sign up is not available');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await window.Clerk.redirectToSignUp({
        redirectUrl: '/editor',
        afterSignUpUrl: '/editor',
        strategy: 'oauth_google',
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign up with Google.');
    }
  };

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
              transition: { duration: 0.5 },
            }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <span className="text-white text-2xl font-bold">&lt;/&gt;</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Join CodePlay</h1>
          <p className="text-gray-400">Create an account to start collaborating</p>
        </div>

        <div className="bg-[#1E293B]/30 backdrop-blur-sm rounded-lg p-6 border border-[#3B82F6]/20">
          <form onSubmit={handleSignUp}>
            {error && (
              <motion.div
                className="bg-red-500 text-white text-sm p-2 rounded-md mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A101F] text-white p-3 rounded-md border border-[#3B82F6]/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A101F] text-white p-3 rounded-md border border-[#3B82F6]/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Enter your password"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md font-bold text-white transition-all ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90'
              }`}
              whileHover={isSubmitting ? undefined : { scale: 1.05 }}
              whileTap={isSubmitting ? undefined : { scale: 0.95 }}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </motion.button>

          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400 mb-2">or</p>
            <motion.button
              onClick={handleGoogleSignUp}
              className="w-full py-3 rounded-md font-bold text-white bg-[#DB4437] hover:opacity-90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up with Google
            </motion.button>
          </div>
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

export default SignUp;
