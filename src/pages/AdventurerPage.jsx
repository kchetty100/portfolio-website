import React, { useState } from 'react';
import { FaRocket, FaArrowLeft, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import SkillsSimple from './SkillsSimple';
import ExperiencePage from './ExperiencePage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';

const AdventurerPage = ({ onBack, onHome }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState('adventurer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const correctPassword = '0836003411';

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val === correctPassword) {
      setIsUnlocked(true);
      setPasswordError('');
    } else if (val.length === correctPassword.length) {
      setPasswordError('Incorrect password');
      setTimeout(() => setPasswordError(''), 2000);
      setPassword('');
    }
  };

  const handleBackToPassword = () => {
    setIsUnlocked(false);
    setPassword('');
    setPasswordError('');
  };

  // If home view is selected, go back to landing page
  if (currentView === 'home') {
    if (onHome) {
      onHome();
    }
    return null;
  }

  // Handle different views
  if (currentView === 'skills') {
    return <SkillsSimple onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'experience') {
    return <ExperiencePage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'projects') {
    return <ProjectsPage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <ContactPage onBack={() => setCurrentView('adventurer')} onHome={() => setCurrentView('home')} />;
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {/* Password Protection Overlay */}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="bg-black/80 border border-red-700 rounded-xl p-8 w-96 text-center shadow-[0_0_25px_rgba(229,9,20,0.5)]">
            <div className="flex items-center justify-center mb-6">
              <FaRocket className="text-red-500 text-4xl mr-4" />
              <h2 className="text-2xl font-bold text-white">Adventurer Access</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2">
                Enter Access Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full text-center tracking-widest text-white bg-black/60 border-2 rounded-lg py-3 px-4 outline-none ${
                    passwordError ? 'border-red-600 animate-pulse' : 'border-red-700 focus:border-red-500'
                  }`}
                  placeholder="Enter access code"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <div className="text-red-500 mt-2 text-sm">{passwordError}</div>
              )}
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              10-digit access code required
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={onHome}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={onBack} 
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={() => setCurrentView('home')} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🚀
                </div>
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-2xl hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Skills
              </button>
              <button 
                onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Experience
              </button>
              <button 
                onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Projects
              </button>
              <button 
                onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Contact
              </button>
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                    🚀
                  </div>
                  <span>Back to Profile Selection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Centered Image */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <img
              src="/yas.jpg"
              alt="Adventurer Profile"
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-full object-cover mx-auto shadow-2xl border-4 border-red-500 hover:border-red-400 transition-all duration-300 hover:scale-105"
            />
          </div>
          
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-red-500">Adventurer</span> Mode
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Welcome to the secret adventurer profile! This is where the real journey begins.
            </p>
          </div>
          
          {/* Adventure Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-red-500 text-3xl mb-2">🌍</div>
              <h3 className="text-white font-bold text-lg mb-2">Explorations</h3>
              <p className="text-gray-300 text-sm">42 countries visited</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-red-500 text-3xl mb-2">🏔️</div>
              <h3 className="text-white font-bold text-lg mb-2">Peaks Conquered</h3>
              <p className="text-gray-300 text-sm">15 mountains climbed</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-red-500 text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold text-lg mb-2">Adventures</h3>
              <p className="text-gray-300 text-sm">127 epic experiences</p>
            </div>
          </div>
          
          {/* Secret Message */}
          <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 rounded-xl p-6 max-w-2xl mx-auto border border-red-500/30">
            <p className="text-gray-200 text-lg leading-relaxed">
              "The greatest adventure is the one that begins with a single step into the unknown. 
              Every line of code is a new path, every bug a hidden treasure, and every deployment 
              a leap into the digital wilderness. Welcome to the adventure of a lifetime! 🚀"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventurerPage;
