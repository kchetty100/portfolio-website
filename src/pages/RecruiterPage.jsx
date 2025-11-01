import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaBriefcase, FaThumbsUp, FaEnvelope, FaMusic, FaBook, FaBlog, FaPhone } from 'react-icons/fa';
import ProjectsPage from './ProjectsPage';
import ExperiencePage from './ExperiencePage';
import GamesPage from './GamesPage';
import SkillsSimple from './SkillsSimple';
import BooksPage from './BooksPage';
import ContactPage from './ContactPage';
import MusicPage from './MusicPage';
import BlogPage from './BlogPage';

const RecruiterPage = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('recruiter');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const topPicksRef = useRef(null);
  const continueWatchingRef = useRef(null);
  const topPicksScrollingRef = useRef(false);
  const continueWatchingScrollingRef = useRef(false);
  const [topPicksFadeLeft, setTopPicksFadeLeft] = useState(false);
  const [topPicksFadeRight, setTopPicksFadeRight] = useState(true);
  const [continueFadeLeft, setContinueFadeLeft] = useState(false);
  const [continueFadeRight, setContinueFadeRight] = useState(true);

  // Initialize scroll position and handle infinite loop for top picks
  useEffect(() => {
    const container = topPicksRef.current;
    if (!container) return;

    // Set initial scroll to the left (start) after content renders
    const initScroll = () => {
      const scrollContent = container.querySelector('div');
      if (scrollContent && scrollContent.scrollWidth > 0) {
        // Start from the left
        container.scrollLeft = 0;
      }
    };
    
    // Try immediately and also after a short delay to ensure content is rendered
    initScroll();
    const timeout = setTimeout(initScroll, 100);

    const handleScroll = () => {
      if (topPicksScrollingRef.current) return;
      
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const halfWidth = scrollWidth / 2;
      
      // Fade effects
      setTopPicksFadeLeft(scrollLeft > 10);
      setTopPicksFadeRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Loop forward: if scrolled past the end of first set, jump back to start
      if (scrollLeft >= halfWidth) {
        topPicksScrollingRef.current = true;
        container.scrollLeft = scrollLeft - halfWidth;
        topPicksScrollingRef.current = false;
      }
      // Loop backward: if scrolled before start, jump to end of first set
      else if (scrollLeft <= 0) {
        topPicksScrollingRef.current = true;
        container.scrollLeft = halfWidth + scrollLeft;
        topPicksScrollingRef.current = false;
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      clearTimeout(timeout);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize scroll position and handle infinite loop for continue watching
  useEffect(() => {
    const container = continueWatchingRef.current;
    if (!container) return;

    // Set initial scroll to the left (start) after content renders
    const initScroll = () => {
      const scrollContent = container.querySelector('div');
      if (scrollContent && scrollContent.scrollWidth > 0) {
        // Start from the left
        container.scrollLeft = 0;
      }
    };
    
    // Try immediately and also after a short delay to ensure content is rendered
    initScroll();
    const timeout = setTimeout(initScroll, 100);

    const handleScroll = () => {
      if (continueWatchingScrollingRef.current) return;
      
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const halfWidth = scrollWidth / 2;
      
      // Fade effects
      setContinueFadeLeft(scrollLeft > 10);
      setContinueFadeRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Loop forward: if scrolled past the end of first set, jump to start
      if (scrollLeft >= halfWidth) {
        continueWatchingScrollingRef.current = true;
        container.scrollLeft = scrollLeft - halfWidth;
        continueWatchingScrollingRef.current = false;
      }
      // Loop backward: if scrolled before start, jump to end of first set
      else if (scrollLeft <= 0) {
        continueWatchingScrollingRef.current = true;
        container.scrollLeft = halfWidth + scrollLeft;
        continueWatchingScrollingRef.current = false;
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      clearTimeout(timeout);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Trigger fade-in animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const tiles = document.querySelectorAll('.tile-fade-in');
      tiles.forEach(tile => {
        tile.classList.add('visible');
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentView]);

  const topPicks = [
    { title: 'Skills', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop', icon: <FaCode /> },
    { title: 'Experience', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop', icon: <FaBriefcase /> },
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

  // Duplicate arrays for infinite scroll
  const topPicksDouble = [...topPicks, ...topPicks];
  const continueWatchingDouble = [...continueWatching, ...continueWatching];

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
    if (title === 'Music') {
      setCurrentView('music');
      window.scrollTo(0, 0);
      return;
    }
    if (title === 'Blogs') {
      setCurrentView('blog');
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

  if (currentView === 'music') {
    return <MusicPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'blog') {
    return <BlogPage onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
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
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={() => { setCurrentView('skills'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { setCurrentView('projects'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  👔
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
                onClick={() => { setCurrentView('experience'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Experience
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
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    👔
                  </div>
                  <span>Back to Profile Selection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 sm:pt-20 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-center">
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
        
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 max-w-[calc(100%-2rem)] sm:max-w-3xl pr-4 text-left">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            KEEGAN CHETTY - SENIOR FULL STACK DEVELOPER
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-4xl leading-relaxed">
            Experienced Full-Stack Developer skilled in Java (Spring Boot), Angular, React, and cloud-native microservices. 
            Proven ability to modernize legacy systems, automate DevOps pipelines, and deliver secure, scalable enterprise solutions. 
            Passionate about innovation, system optimization, and cybersecurity, with hands-on experience across banking, fintech, 
            and personal automation projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
            <button className="bg-black/80 hover:bg-black text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px]">
              <FaPlay className="text-white text-sm sm:text-base" />
              <span className="text-sm sm:text-base md:text-lg font-semibold">Resume</span>
            </button>
            <button className="bg-black/80 hover:bg-black text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px]">
              <FaLinkedin className="text-white text-sm sm:text-base" />
              <span className="text-sm sm:text-base md:text-lg font-semibold">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Top Picks for Recruiter */}
      <div className="py-6 sm:py-8 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Today's Top Picks for recruiter</h2>
          <div 
            ref={topPicksRef}
            className={`horizontal-scroll-container ${topPicksFadeLeft ? '' : 'fade-left'} ${topPicksFadeRight ? '' : 'fade-right'}`}
          >
            <div className="flex gap-3 sm:gap-4 md:gap-6 pb-2" style={{ display: 'inline-flex', minWidth: 'max-content' }}>
              {topPicksDouble.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleTileClick(item.title)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 tile-fade-in flex-shrink-0 relative w-[calc(50vw-1.5rem)] sm:w-40 md:w-44 lg:w-48"
                  style={{ minWidth: '140px', maxWidth: '200px' }}
                  onMouseEnter={(e) => e.currentTarget.style.zIndex = '20'}
                  onMouseLeave={(e) => e.currentTarget.style.zIndex = '1'}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 skill-card-hover">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching for Recruiter */}
      <div className="py-6 sm:py-8 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Continue Watching for recruiter</h2>
          <div 
            ref={continueWatchingRef}
            className={`horizontal-scroll-container ${continueFadeLeft ? '' : 'fade-left'} ${continueFadeRight ? '' : 'fade-right'}`}
          >
            <div className="flex gap-3 sm:gap-4 md:gap-6 pb-2" style={{ display: 'inline-flex', minWidth: 'max-content' }}>
              {continueWatchingDouble.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleTileClick(item.title)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 tile-fade-in flex-shrink-0 relative w-[calc(50vw-1.5rem)] sm:w-40 md:w-44 lg:w-48"
                  style={{ minWidth: '140px', maxWidth: '200px' }}
                  onMouseEnter={(e) => e.currentTarget.style.zIndex = '20'}
                  onMouseLeave={(e) => e.currentTarget.style.zIndex = '1'}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 skill-card-hover">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
