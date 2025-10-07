import React, { useState } from 'react';
import { FaPlay, FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaCertificate, FaBriefcase, FaThumbsUp, FaEnvelope, FaMusic, FaBook, FaBlog, FaPhone } from 'react-icons/fa';
import ProjectsPage from './ProjectsPage';
import ExperiencePage from './ExperiencePage';
import GamesPage from './GamesPage';
import SkillsSimple from './SkillsSimple';
import BooksPage from './BooksPage';
import ContactPage from './ContactPage';

const RecruiterPage = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('recruiter');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topPicks = [
    { title: 'Skills', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop', icon: <FaCode /> },
    { title: 'Experience', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop', icon: <FaBriefcase /> },
    { title: 'Certifications', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop', icon: <FaCertificate /> },
    { title: 'Projects', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop', icon: <FaProjectDiagram /> },
    { title: 'Games', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop', icon: <FaPlay /> }
  ];

  const continueWatching = [
    { title: 'Music', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop', icon: <FaMusic /> },
    { title: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop', icon: <FaBook /> },
    { title: 'Blogs', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop', icon: <FaBlog /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop', icon: <FaPhone /> },
    { title: 'Games', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop', icon: <FaPlay /> }
  ];

  const handleTileClick = (title) => {
    if (title === 'Skills') {
      setCurrentView('skills');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Experience') {
      setCurrentView('experience');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Books') {
      setCurrentView('books');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Contact Me') {
      setCurrentView('contact');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Projects') {
      setCurrentView('projects');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Games') {
      setCurrentView('games');
      window.scrollTo(0, 0);
      return;
    }
  };

  // If skills view is selected, show skills page
  if (currentView === 'skills') {
    return <SkillsSimple onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'projects') {
    return <ProjectsPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'experience') {
    return <ExperiencePage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'books') {
    return <BooksPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <ContactPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'games') {
    return <GamesPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
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
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
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
                onClick={() => { setCurrentView('experience'); setExperienceUnlocked(false); setExperiencePin(''); setPinError(''); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Professional
              </button>
              <button 
                onClick={() => {
                  setCurrentView('skills');
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                Skills
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
              <a href="https://github.com/kchetty100" target="_blank" rel="noreferrer" className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">GitHub</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 min-h-screen flex items-center">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onPlay={() => console.log('Video started playing')}
          onError={(e) => {
            console.log('Video failed to load:', e.target.error);
            console.log('Video src:', e.target.src);
            e.target.style.display = 'none';
          }}
          style={{ zIndex: 0 }}
        >
          <source src="/Dwight Gets the Steam - The Office.mp4" type="video/mp4" />
        </video>
        {/* Fallback Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop")',
            filter: 'blur(2px)',
            zIndex: -1
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="absolute bottom-6 left-4 sm:left-6 z-10 max-w-3xl pr-4 text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
            KEEGAN CHETTY - SENIOR FULL STACK DEVELOPER
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            Experienced Full-Stack Developer skilled in Java (Spring Boot), Angular, React, and cloud-native microservices. 
            Proven ability to modernize legacy systems, automate DevOps pipelines, and deliver secure, scalable enterprise solutions. 
            Passionate about innovation, system optimization, and cybersecurity, with hands-on experience across banking, fintech, 
            and personal automation projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
            <button className="bg-black/80 hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105">
              <FaPlay className="text-white" />
              <span className="text-base sm:text-lg font-semibold">Resume</span>
            </button>
            <button className="bg-black/80 hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105">
              <FaLinkedin className="text-white" />
              <span className="text-base sm:text-lg font-semibold">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Top Picks for Recruiter */}
      <div className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Today's Top Picks for recruiter</h2>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Watching for Recruiter */}
      <div className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">Continue Watching for recruiter</h2>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
