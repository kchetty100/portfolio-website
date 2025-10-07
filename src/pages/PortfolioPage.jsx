import React, { useState } from 'react';
import { FaPlay, FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaCertificate, FaBriefcase, FaThumbsUp, FaEnvelope, FaMusic, FaBook, FaBlog, FaPhone } from 'react-icons/fa';
import SkillsSimple from './SkillsSimple';
import LandingPage from './LandingPage';
import ExperiencePage from './ExperiencePage';
import ProjectsPage from './ProjectsPage';
import GamesPage from './GamesPage';
import ContactPage from './ContactPage';

const PortfolioPage = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('portfolio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topPicks = [
    { title: 'Skills', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop', icon: <FaCode /> },
    { title: 'Projects', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop', icon: <FaProjectDiagram /> },
    { title: 'Experience', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop', icon: <FaBriefcase /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=800&fit=crop', icon: <FaEnvelope /> },
    { title: 'Games', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop', icon: <FaPlay /> }
  ];

  const continueWatching = [
    { title: 'Music', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&h=800&fit=crop', icon: <FaMusic /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=800&fit=crop', icon: <FaPhone /> },
    { title: 'Projects', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop', icon: <FaProjectDiagram /> },
    { title: 'Games', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop', icon: <FaPlay /> }
  ];

  const handleTileClick = (title) => {
    if (title === 'Skills') {
      setCurrentView('skills');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Projects') {
      setCurrentView('projects');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Experience') {
      setCurrentView('experience');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Contact Me') {
      setCurrentView('contact');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Games') {
      setCurrentView('games');
      window.scrollTo(0, 0);
      return;
    }
  };

  // If home view is selected, go back to landing page
  if (currentView === 'home') {
    if (onBack) {
      onBack();
    }
    return null;
  }

  // If skills view is selected, show skills page
  if (currentView === 'skills') {
    return <SkillsSimple 
      onBack={() => setCurrentView('portfolio')} 
      onHome={() => setCurrentView('home')} 
    />;
  }

  if (currentView === 'projects') {
    return <ProjectsPage 
      onBack={() => setCurrentView('portfolio')} 
      onHome={() => setCurrentView('home')} 
    />;
  }

  if (currentView === 'experience') {
    return <ExperiencePage 
      onBack={() => setCurrentView('portfolio')} 
      onHome={() => setCurrentView('home')} 
    />;
  }


  if (currentView === 'contact') {
    return <ContactPage 
      onBack={() => setCurrentView('portfolio')} 
      onHome={() => setCurrentView('home')} 
    />;
  }

  if (currentView === 'games') {
    return <GamesPage 
      onBack={() => setCurrentView('portfolio')} 
      onHome={() => setCurrentView('home')} 
    />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentView('home')} 
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  💻
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
                  onBack();
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
                onClick={() => { 
                  setCurrentView('projects'); 
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    💻
                  </div>
                  <span>Back to Profile Selection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh]">
        {/* Video Background */}
        <video
          key="batman_banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="metadata"
          onCanPlay={(e) => { e.currentTarget.style.display = 'block'; }}
          onError={(e) => { e.currentTarget.remove(); }}
        >
          <source src="/batman_banner.mp4" type="video/mp4" />
        </video>
        {/* Fallback image behind video */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop")',
          zIndex: -1
        }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-6 left-4 sm:left-6 z-10 max-w-3xl pr-4 text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
            KEEGAN CHETTY - SENIOR FULL STACK DEVELOPER
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-4xl">
            Dynamic and results-driven Senior Software Engineer with 8+ years in full-stack development across high-impact, large-scale applications. Expertise in React, Node.js, Python, AWS, Kubernetes, and Docker. Achieved serving 10,000+ users and managing 50 million+ bookings.
          </p>
          <div className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-6">
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 hover:bg-gray-800 transition-colors border border-gray-600">
              <FaPlay className="text-white" />
              <span className="text-sm sm:text-base">Resume</span>
            </button>
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 hover:bg-gray-800 transition-colors border border-gray-600">
              <FaLinkedin className="text-white" />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </button>
          </div>
        </div>
        {/* Spacer no longer needed because section has a min-height */}
      </section>

      {/* Today's Top Picks Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Today's Top Picks for developers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {topPicks.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 skill-card-hover">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-3xl mb-2">{item.icon}</div>
                      <p className="text-white font-bold text-lg">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
            Continue Watching for developer
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {continueWatching.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 skill-card-hover">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-3xl mb-2">{item.icon}</div>
                      <p className="text-white font-bold text-lg">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
