import { motion } from "framer-motion";

interface SkillProgressBarProps {
  skill: string;
  progress: number;
}

const SkillProgressBar = ({ skill, progress }: SkillProgressBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{skill}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-[#0F172A]/50 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full bg-[#3B82F6]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default SkillProgressBar;