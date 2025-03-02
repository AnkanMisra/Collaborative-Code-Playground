import { useState } from 'react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
];

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleLanguageSelect = (languageId: string) => {
    onLanguageChange(languageId);
    setIsOpen(false);
  };

  const currentLanguageName = LANGUAGES.find(lang => lang.id === currentLanguage)?.name || 'Select Language';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B]/70 text-white/90 rounded-md 
                 hover:bg-[#1E293B] transition-all duration-200 text-sm font-medium border border-[#3B82F6]/10"
      >
        <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
        {currentLanguageName}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-[#1E293B] border border-[#3B82F6]/10 rounded-md shadow-lg z-10">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {LANGUAGES.map(language => (
              <li key={language.id}>
                <button
                  onClick={() => handleLanguageSelect(language.id)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#3B82F6]/10 transition-colors
                            ${currentLanguage === language.id ? 'bg-[#3B82F6]/20 text-white' : 'text-white/80'}`}
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;