import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaCode, FaDiscord, FaGithub, FaRocket, FaUsers, FaStar} from 'react-icons/fa';
import { FiCheckCircle, FiXCircle, FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Particles from '../common/Background/Particles';
import Navbar from '../common/Navbar';
import {Badge} from '../../components/ui/badge'; 
import { Button } from '../../components/ui/button'; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'; 
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

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


const sampleCode = {
  javascript: `// Real-time collaborative code editing
function calculateSum(a, b) {
  return a + b;
}

// User 1 is typing...
const result = calculateSum(5, 10);
console.log(result); // 15`,
  python: `# Real-time collaborative code editing
def calculate_sum(a, b):
    return a + b

# User 2 is typing...
result = calculate_sum(5, 10)
print(result)  # 15`,
  html: `<!-- Real-time collaborative code editing -->
<div class="container">
  <!-- User 3 is typing... -->
  <h1>Hello, CodePlay!</h1>
  <p>Collaborate in real-time with your team</p>
</div>`,
}


const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Developer at TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "CodePlay has transformed how our team collaborates. The real-time editing and seamless integration with our workflow has boosted our productivity by 40%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Engineer at StartupX",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Teaching coding concepts has never been easier. I can guide my junior developers through complex problems in real-time, making mentorship much more effective.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "CS Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I use CodePlay for all my programming classes. Students can follow along as I code, and I can see their progress in real-time. It's revolutionized my teaching approach.",
    rating: 4,
  },
  {
    id: 4,
    name: "Jamie Taylor",
    role: "Freelance Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As a freelancer working with clients globally, CodePlay lets me collaborate effectively regardless of time zones. The ability to leave comments and track changes is invaluable.",
    rating: 5,
  },
]



const workflowSteps = [
  {
    id: 1,
    title: "Create a Session",
    description: "Start a new coding session and invite team members to join with a simple link.",
    icon: <FaCode className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Collaborate in Real-time",
    description: "Code together with instant updates. See who's typing and where they're making changes.",
    icon: <FaUsers className="h-6 w-6" />,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: 3,
    title: "Deploy Instantly",
    description: "Test and deploy your code with one click. Share your creation with the world.",
    icon: <FaRocket className="h-6 w-6" />,
    color: "from-purple-400 to-purple-600",
  },
]

const featureComparison = {
  categories: ["Collaboration", "Development", "Deployment", "Support"],
  plans: [
    {
      name: "Free",
      description: "Perfect for individuals and small projects",
      price: "$0",
      period: "forever",
      features: {
        Collaboration: [
          { name: "Real-time editing", included: true },
          { name: "Up to 3 collaborators", included: true },
          { name: "Basic chat", included: true },
          { name: "Session history (24h)", included: true },
        ],
        Development: [
          { name: "Code syntax highlighting", included: true },
          { name: "10+ language support", included: true },
          { name: "Basic autocomplete", included: true },
          { name: "GitHub integration", included: false },
        ],
        Deployment: [
          { name: "Preview environment", included: true },
          { name: "Custom domain", included: false },
          { name: "Continuous deployment", included: false },
        ],
        Support: [
          { name: "Community support", included: true },
          { name: "Email support", included: false },
          { name: "Priority response", included: false },
        ],
      },
    },
    {
      name: "Premium",
      description: "For professional developers and teams",
      price: "$12",
      period: "per month",
      features: {
        Collaboration: [
          { name: "Real-time editing", included: true },
          { name: "Unlimited collaborators", included: true },
          { name: "Advanced chat & video", included: true },
          { name: "Full session history", included: true },
        ],
        Development: [
          { name: "Code syntax highlighting", included: true },
          { name: "40+ language support", included: true },
          { name: "Advanced autocomplete", included: true },
          { name: "GitHub integration", included: true },
        ],
        Deployment: [
          { name: "Preview environment", included: true },
          { name: "Custom domain", included: true },
          { name: "Continuous deployment", included: true },
        ],
        Support: [
          { name: "Community support", included: true },
          { name: "Email support", included: true },
          { name: "Priority response", included: false },
        ],
      },
    },
  ],
}


interface LandingPageProps {
  connected: boolean;
}


const LandingPage = ({ connected }: LandingPageProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [activeCodeTab, setActiveCodeTab] = useState("javascript");
  const [typingEffect, setTypingEffect] = useState(true)

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
        howItWorksRef={howItWorksRef as React.RefObject<HTMLDivElement>}
        pricingRef={pricingRef as React.RefObject<HTMLDivElement>}
        isLandingPage={true}
      />

      <section className="relative min-h-screen flex items-center justify-center pt-20">

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >

            <motion.div
              className="inline-block mb-6 px-4 py-1.5 bg-[#1E293B]/80 rounded-full text-sm font-bold tracking-wider border border-[#3B82F6]/40 backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                transition: { duration: 0.2 }
              }}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                <span className="text-white/90">Alpha Release v0.1.0</span>
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
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${connected ? 'bg-green-500/20' : 'bg-red-500/20'} backdrop-blur-sm`}>
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              <span className="text-sm text-white/80">
                {connected ? 'Server Connected' : 'Connecting to server...'}
              </span>
            </div>
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




      <section
          ref={howItWorksRef}
          id="how-it-works"
          className="py-24 relative z-10 bg-gradient-to-b from-[#0A0F1E] to-[#0F172A]"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* <Badge className="mb-4" variant="outline">
                Workflow
              </Badge> */}
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                A simple, intuitive workflow designed for productive collaboration
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Connecting line */}
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 hidden md:block"
                  aria-hidden="true"
                ></div>

                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="md:w-1/2 flex justify-center">
                      <motion.div
                        className={`relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="text-white">{step.icon}</div>
                        <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center border-2 border-blue-500">
                          <span className="text-white font-bold">{step.id}</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
            
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">See It In Action</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Experience real-time collaboration with our interactive demo
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-[#1E293B]/80 rounded-lg overflow-hidden border border-blue-500/20 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex border-b border-blue-500/20">
                  <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="w-full">
                    <div className="flex items-center justify-between px-4 py-2">
                      <TabsList className="bg-[#0F172A]/50">
                        <TabsTrigger value="javascript" className="data-[state=active]:bg-blue-600">
                          JavaScript
                        </TabsTrigger>
                        <TabsTrigger value="python" className="data-[state=active]:bg-blue-600">
                          Python
                        </TabsTrigger>
                        <TabsTrigger value="html" className="data-[state=active]:bg-blue-600">
                          HTML
                        </TabsTrigger>
                      </TabsList>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          <span className="text-xs text-white/60">2 users online</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <TabsContent value="javascript" className="m-0">
                        <pre className="p-4 text-white font-mono text-sm overflow-x-auto">
                          <code>{sampleCode.javascript}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="python" className="m-0">
                        <pre className="p-4 text-white font-mono text-sm overflow-x-auto">
                          <code>{sampleCode.python}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="html" className="m-0">
                        <pre className="p-4 text-white font-mono text-sm overflow-x-auto">
                          <code>{sampleCode.html}</code>
                        </pre>
                      </TabsContent>

                      {typingEffect && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-blue-600/20 px-2 py-1 rounded-md backdrop-blur-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-white/80">User 2 is typing...</span>
                        </div>
                      )}
                    </div>
                  </Tabs>
                </div>

                <div className="p-4 bg-[#0F172A]/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User avatar" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-white/60">You</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    Share Session
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


         <section ref={testimonialsRef} id="testimonials" className="py-24 relative z-10 bg-[#0F172A]/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
            
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">What Our Users Say</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join thousands of developers who are already using our platform
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
              <div className="relative h-[300px] md:h-[250px]">
                <AnimatePresence mode="wait">
                  {testimonials.map(
                    (testimonial, index) =>
                      index === activeTestimonialIndex && (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-blue-500/20"
                        >
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                                  />
                                ))}
                              </div>
                              <p className="text-white text-lg mb-6 italic">"{testimonial.content}"</p>
                            </div>
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-white font-medium">{testimonial.name}</h4>
                                <p className="text-white/60 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setActiveTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`w-2 h-2 rounded-full p-0 ${index === activeTestimonialIndex ? "bg-blue-600" : "bg-transparent"}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setActiveTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section ref={pricingRef} id="pricing" className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
           
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Choose Your Plan</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">Transparent pricing with no hidden fees</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featureComparison.plans.map((plan, planIndex) => (
                  <motion.div
                    key={plan.name}
                    className={`bg-[#1E293B]/30 rounded-lg overflow-hidden border backdrop-blur-sm ${planIndex === 1 ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : "border-blue-500/20"}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: planIndex * 0.2 }}
                    whileHover={{
                      y: -10,
                      boxShadow:
                        planIndex === 1
                          ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                          : "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
                    }}
                  >
                    <div className={`p-6 ${planIndex === 1 ? "bg-gradient-to-r from-blue-600/20 to-blue-800/20" : ""}`}>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/70 mb-4">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-white/60 ml-2">{plan.period}</span>
                      </div>
                      <Button
                        className={`w-full ${planIndex === 1 ? "bg-blue-600 hover:bg-blue-700" : "bg-[#0F172A] hover:bg-[#1E293B]"}`}
                      >
                        {planIndex === 0 ? "Get Started" : "Upgrade Now"}
                      </Button>
                    </div>

                    <div className="p-6 border-t border-blue-500/20">
                      {featureComparison.categories.map((category, categoryIndex) => (
                        <div key={category} className="mb-6 last:mb-0">
                          <h4 className="text-lg font-medium text-white mb-3">{category}</h4>
                          <ul className="space-y-2">
                            {plan.features[category as keyof typeof plan.features].map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included ? (
                                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                ) : (
                                  <FiXCircle className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                                )}
                                <span className={feature.included ? "text-white" : "text-white/40"}>
                                  {feature.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
            <SignedOut>
              <SignInButton mode="modal">
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
                  className="px-8 py-4 bg-[#3B82F6] text-white rounded-md font-medium text-lg hover:bg-[#2563EB] transition-colors"
                >
                  Sign In to Start
                </motion.button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
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
                {connected ? 'Start Coding Now' : 'Connecting...'}
              </motion.button>
            </SignedIn>
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
                onClick={() => scrollToSection(featuresRef as React.RefObject<HTMLDivElement>)}
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Features
              </motion.button>
              <motion.button
              onClick={() => scrollToSection(howItWorksRef as React.RefObject<HTMLDivElement>)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Go to how it works section"
            >
              How It Works
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(pricingRef as React.RefObject<HTMLDivElement>)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Go to pricing section"
            >
              Pricing
            </motion.button>
              <motion.button
                onClick={() => scrollToSection(faqRef as React.RefObject<HTMLDivElement>)}
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                FAQ
              </motion.button>
              <motion.button
                onClick={() => scrollToSection(ctaRef as React.RefObject<HTMLDivElement>)}
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


