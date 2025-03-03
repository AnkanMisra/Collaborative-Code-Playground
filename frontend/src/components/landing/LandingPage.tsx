import { useNavigate } from 'react-router-dom';
import Particles from '../common/Background/Particles';
import { FaCode, FaUsers, FaRocket, FaGithub, FaDiscord } from 'react-icons/fa';
import { motion, useScroll, useTransform} from 'framer-motion';
import { useRef, useEffect } from 'react';
import Navbar from '../common/Navbar';


const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const shimmer = {
  hidden: { backgroundPosition: '200% 0' },
  visible: { 
    backgroundPosition: '-200% 0',
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear"
    }
  }
};

interface LandingPageProps {
  connected: boolean;
}

const LandingPage = ({ connected }: LandingPageProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const backgroundParallax = useTransform(scrollY, [0, 1000], [0, 100]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0A0F1E] font-['Roboto_Condensed']">
      <motion.div 
        className="fixed inset-0 w-full h-full"
        style={{ y: backgroundParallax }}
      >
        <Particles
          particleCount={1800}
          particleSpread={20}
          speed={0.3}
          particleColors={['#ffffff', '#3B82F6']}
          moveParticlesOnHover={true}
          particleHoverFactor={1.2}
          particleBaseSize={150}
          alphaParticles={true}
        />
      </motion.div>

      <Navbar 
        connected={connected} 
        onScrollToSection={(ref: React.RefObject<HTMLDivElement>) => scrollToSection(ref)}
        featuresRef={featuresRef as React.RefObject<HTMLDivElement>}
        faqRef={faqRef as React.RefObject<HTMLDivElement>}
        ctaRef={ctaRef as React.RefObject<HTMLDivElement>}
        isLandingPage={true}
      />

      <section className="relative min-h-screen flex items-center justify-center pt-20">

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >

            <motion.div
              className="inline-block mb-6 px-4 py-1 bg-[#1E293B]/50 rounded-full text-sm font-bold tracking-wider border border-[#3B82F6]/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Alpha Release v0.1.0
              </span>
            </motion.div>


            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#38BDF8] bg-size-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              variants={shimmer}
              style={{
                backgroundSize: "200% 100%",
              }}
            >
              Collaborative Code Playground
            </motion.h1>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.2 }
              }}
              className="max-w-2xl mx-auto bg-[#1E293B]/30 p-4 rounded-lg backdrop-blur-sm border border-[#3B82F6]/20"
            >
              <p className="text-xl text-white">
                Code together in real-time, share ideas, and build amazing projects with developers worldwide
              </p>
            </motion.div>
          </motion.div>


          <motion.div
            className="flex justify-center gap-4 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(30, 41, 59, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://github.com/AnkanMisra/Collaborative-Code-Playground', '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1E293B]/50 text-white rounded-lg border border-[#3B82F6]/20 hover:bg-[#1E293B]/80 transition-all"
            >
              <FaGithub className="text-xl" /> GitHub
            </motion.button>
            <motion.button
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(30, 41, 59, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://discordapp.com/users/purpose2004', '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1E293B]/50 text-white rounded-lg border border-[#3B82F6]/20 hover:bg-[#1E293B]/80 transition-all"
            >
              <FaDiscord className="text-xl" /> Discord
            </motion.button>
          </motion.div>
        </div>
      </section>


      <section ref={featuresRef} id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to collaborate effectively with your team
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >

            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -15, 
                boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(30, 41, 59, 0.5)"
              }}
              className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20 flex flex-col items-center text-center transition-all duration-300"
            >
              <motion.div 
                className="bg-gradient-to-br from-[#38BDF8] to-[#60A5FA] p-4 rounded-full mb-4"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                <FaCode className="text-2xl text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Coding</h3>
              <p className="text-gray-300">Collaborate on code with instant updates and live feedback from your team</p>
            </motion.div>


            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -15, 
                boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(30, 41, 59, 0.5)"
              }}
              className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20 flex flex-col items-center text-center transition-all duration-300"
            >
              <motion.div 
                className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] p-4 rounded-full mb-4"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                <FaUsers className="text-2xl text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
              <p className="text-gray-300">Work seamlessly with your team members in a shared environment</p>
            </motion.div>


            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -15, 
                boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(30, 41, 59, 0.5)"
              }}
              className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20 flex flex-col items-center text-center transition-all duration-300"
            >
              <motion.div 
                className="bg-gradient-to-br from-[#60A5FA] to-[#93C5FD] p-4 rounded-full mb-4"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                <FaRocket className="text-2xl text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Deployment</h3>
              <p className="text-gray-300">Deploy your projects with just one click and share with the world</p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <section ref={faqRef} id="faq" className="py-24 relative z-10 bg-[#0F172A]/50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to know about our platform
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How does real-time collaboration work?",
                answer: "Our platform uses WebSockets to enable instant synchronization between all connected users. When one person makes a change, it's immediately reflected for everyone else in the session."
              },
              {
                question: "Is my code secure on your platform?",
                answer: "Absolutely. We use end-to-end encryption to ensure your code remains private. Your data is never stored on our servers unless you explicitly save it to your account."
              },
              {
                question: "How many people can collaborate simultaneously?",
                answer: "Our standard plan supports up to 10 simultaneous users in a single session with no performance degradation. Enterprise plans can support up to 50 concurrent users."
              },
              {
                question: "Which programming languages are supported?",
                answer: "We support over 40 programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Ruby, PHP, and many more. Each comes with full syntax highlighting and language-specific features."
              },
              {
                question: "Can I use this for teaching coding?",
                answer: "Yes! Many instructors use our platform for teaching programming concepts. The real-time nature makes it perfect for demonstrating code and helping students with immediate feedback."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-6 bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.3)",
                  backgroundColor: "rgba(30, 41, 59, 0.5)"
                }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section ref={ctaRef} id="cta" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-[#1E293B] to-[#0F172A] p-12 rounded-2xl border border-[#3B82F6]/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              boxShadow: "0 20px 50px -10px rgba(59, 130, 246, 0.4)",
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Start Coding Together?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of developers who are already using our platform to collaborate, learn, and build amazing projects.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/editor')}
              disabled={!connected}
              className={`px-8 py-4 bg-[#3B82F6] text-white rounded-md font-medium text-lg
                        ${!connected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2563EB] transition-colors'}`}
            >
              {connected ? 
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{
                    opacity: [1, 0.8, 1],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  Start Coding Now
                </motion.span> 
                : "Connecting..."}
            </motion.button>
          </motion.div>
        </div>
      </section>


      <footer className="py-12 relative z-10 border-t border-[#3B82F6]/10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6 md:mb-0 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] p-2 rounded-md"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-white text-xl font-bold">&lt;/&gt;</span>
              </motion.div>
              <span className="text-white text-xl font-bold">CodePlay</span>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <motion.button 
                onClick={() => scrollToSection(featuresRef)} 
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Features
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection(faqRef)} 
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                FAQ
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection(ctaRef)} 
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Started
              </motion.button>
            </div>
            <div className="flex gap-4">
              <motion.a 
                href="https://github.com/AnkanMisra/Collaborative-Code-Playground" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  color: "#ffffff",
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a 
                href="https://discordapp.com/users/purpose2004" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  color: "#ffffff",
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <FaDiscord className="text-xl" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} CodePlay. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
         