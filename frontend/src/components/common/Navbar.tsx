import { motion } from "framer-motion";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

interface NavbarProps {
  connected: boolean;
  onScrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  featuresRef: React.RefObject<HTMLDivElement>;
  faqRef: React.RefObject<HTMLDivElement>;
  ctaRef: React.RefObject<HTMLDivElement>;
  howItWorksRef: React.RefObject<HTMLDivElement>;
  pricingRef: React.RefObject<HTMLDivElement>;
  isLandingPage: boolean;
}

const Navbar = ({
  connected,
  onScrollToSection,
  featuresRef,
  faqRef,
  ctaRef,
  howItWorksRef,
  pricingRef,
  isLandingPage,
}: NavbarProps) => {
  const navigate = useNavigate();

  const handleStartCoding = () => {
    if (!connected) return;
    navigate("/editor");
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0F1E]/70 border-b border-[#3B82F6]/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] p-2 rounded-md"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <span className="text-white text-xl font-bold">&lt;/&gt;</span>
            </motion.div>
            <span className="text-white text-xl font-bold">CodePlay</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {isLandingPage && (
              <>
                <motion.button
                  onClick={() => featuresRef && onScrollToSection(featuresRef)}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Features
                </motion.button>
                <motion.button
                  onClick={() =>
                    howItWorksRef && onScrollToSection(howItWorksRef)
                  }
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  How It Works
                </motion.button>
                <motion.button
                  onClick={() => pricingRef && onScrollToSection(pricingRef)}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Pricing
                </motion.button>
                <motion.button
                  onClick={() => faqRef && onScrollToSection(faqRef)}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  FAQ
                </motion.button>
                <motion.button
                  onClick={() => ctaRef && onScrollToSection(ctaRef)}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isLandingPage && (
              <>
                <motion.a
                  href="https://github.com/AnkanMisra/Collaborative-Code-Playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                >
                  <FaGithub className="text-xl" />
                </motion.a>
                <motion.a
                  href="https://discordapp.com/users/purpose2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                >
                  <FaDiscord className="text-xl" />
                </motion.a>
              </>
            )}

            <SignedOut>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/sign-up")}
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium text-sm hover:bg-[#2563EB] transition-colors"
              >
                Sign Up
              </motion.button>
            </SignedOut>

            <SignedIn>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/sign-in")}
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium text-sm hover:bg-[#2563EB] transition-colors"
              >
                Sign In
              </motion.button>
            </SignedIn>

            <SignedIn>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 bg-[#1E293B]/50 text-white rounded-md text-sm hover:bg-[#1E293B]/80 transition-colors border border-[#3B82F6]/20"
                >
                  Profile
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartCoding}
                  disabled={!connected}
                  className={`px-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium text-sm
                            ${
                              !connected
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-[#2563EB] transition-colors"
                            }`}
                >
                  {connected ? "Start Coding" : "Connecting..."}
                </motion.button>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      rootBox:
                        "border-2 border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-colors",
                      avatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
