import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VerifyEmail: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      if (!signUp) throw new Error("Sign-up is not available");

      await signUp.attemptEmailAddressVerification({ code });

      // Redirect after successful verification
      window.location.href="/editor"; // Change this to your intended page
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setIsVerifying(false);
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
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-gray-400">Enter the code sent to your email</p>
        </div>

        <div className="bg-[#1E293B]/30 backdrop-blur-sm rounded-lg p-6 border border-[#3B82F6]/20">
          <form onSubmit={handleVerifyEmail}>
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
              <label className="block text-gray-400 text-sm mb-2">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0A101F] text-white p-3 rounded-md border border-[#3B82F6]/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Enter verification code"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isVerifying}
              className={`w-full py-3 rounded-md font-bold text-white transition-all ${
                isVerifying
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90"
              }`}
              whileHover={isVerifying ? undefined : { scale: 1.05 }}
              whileTap={isVerifying ? undefined : { scale: 0.95 }}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </motion.button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <motion.button
            onClick={() => navigate("/")}
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

export default VerifyEmail;
