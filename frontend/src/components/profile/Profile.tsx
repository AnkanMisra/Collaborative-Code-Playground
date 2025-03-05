import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="bg-[#1E293B]/30 rounded-lg p-8 backdrop-blur-sm border border-[#3B82F6]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={user?.imageUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-2 border-[#3B82F6]/40"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white mb-2">{user?.fullName}</h1>
              <p className="text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A]/50 p-4 rounded-lg border border-[#3B82F6]/10">
              <h3 className="text-white font-medium mb-2">Last Sign In</h3>
              <p className="text-gray-400">{new Date(user?.lastSignInAt || "").toLocaleDateString()}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-4 rounded-lg border border-[#3B82F6]/10">
              <h3 className="text-white font-medium mb-2">Account Created</h3>
              <p className="text-gray-400">{new Date(user?.createdAt || "").toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#1E293B]/50 text-white rounded-lg hover:bg-[#1E293B]/80 
                       transition-all duration-200 border border-[#3B82F6]/20 font-medium tracking-wide
                       flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;