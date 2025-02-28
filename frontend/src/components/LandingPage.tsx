import { useNavigate } from 'react-router-dom';
import Particles from './Background/Particles';
import { FaCode, FaUsers, FaRocket, FaGithub, FaDiscord } from 'react-icons/fa';

interface LandingPageProps {
  connected: boolean;
}

const LandingPage = ({ connected }: LandingPageProps) => {
  const navigate = useNavigate();
  
  const handleStartCoding = () => {
    if (!connected) return;
    navigate('/editor');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1E] font-['Roboto_Condensed']">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full relative">
          <Particles
            particleCount={2000}
            particleSpread={20}
            speed={0.3}
            particleColors={['#ffffff', '#ffffff']}
            moveParticlesOnHover={true}
            particleBaseSize={200}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
        <div className="mb-4 px-4 py-1 bg-[#1E293B]/50 rounded-full text-sm font-bold tracking-wider border border-[#3B82F6]/20">
          Alpha Release v0.1.0
        </div>
        
        <h1 className="font-['Roboto_Condensed'] text-5xl md:text-7xl font-black mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] select-none tracking-tight">
          Collaborative Code Playground
        </h1>
        
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl text-gray-300 leading-relaxed">
          Code together in real-time, share ideas, and build amazing projects with developers worldwide
        </p>

        <div className="flex gap-4 mb-12">
          <button
            onClick={() => window.open('https://github.com/AnkanMisra/Collaborative-Code-Playground', '_blank')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B]/80 transition-all font-medium tracking-wide border border-[#3B82F6]/20"
          >
            <FaGithub className="w-5 h-5" /> GitHub
          </button>
          <button
            onClick={() => window.open('https://discordapp.com/users/purpose2004', '_blank')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B]/80 transition-all font-medium tracking-wide border border-[#3B82F6]/20"
          >
            <FaDiscord className="w-5 h-5" /> Discord
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl w-full">
          <div className="flex flex-col items-center p-6 bg-[#1E293B]/30 rounded-lg backdrop-blur-sm hover:bg-[#1E293B]/50 transition-all cursor-pointer border border-[#3B82F6]/10">
            <FaCode className="text-4xl mb-4 text-[#38BDF8]" />
            <h3 className="font-['Roboto_Condensed'] text-xl font-bold mb-2">Real-time Coding</h3>
            <p className="text-center text-gray-300 leading-relaxed">Collaborate on code with instant updates and live feedback</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-[#1E293B]/30 rounded-lg backdrop-blur-sm hover:bg-[#1E293B]/50 transition-all cursor-pointer border border-[#3B82F6]/10">
            <FaUsers className="text-4xl mb-4 text-[#3B82F6]" />
            <h3 className="font-['Roboto_Condensed'] text-xl font-bold mb-2">Team Collaboration</h3>
            <p className="text-center text-gray-300 leading-relaxed">Work seamlessly with your team members in a shared environment</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-[#1E293B]/30 rounded-lg backdrop-blur-sm hover:bg-[#1E293B]/50 transition-all cursor-pointer border border-[#3B82F6]/10">
            <FaRocket className="text-4xl mb-4 text-[#60A5FA]" />
            <h3 className="font-['Roboto_Condensed'] text-xl font-bold mb-2">Instant Deployment</h3>
            <p className="text-center text-gray-300 leading-relaxed">Deploy your projects with just one click</p>
          </div>
        </div>

        <button
          onClick={handleStartCoding}
          disabled={!connected}
          className={`px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] 
            hover:from-[#2563EB] hover:to-[#0EA5E9] transform hover:scale-105 transition-all duration-200 shadow-lg
            font-['Roboto_Condensed'] tracking-wide
            ${!connected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {connected ? 'Start Coding Now' : 'Connecting...'}
        </button>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>Project in Alpha Phase</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;