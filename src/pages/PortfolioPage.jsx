import React, { useState } from 'react';
import { FaPlay, FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaCertificate, FaBriefcase, FaThumbsUp, FaEnvelope, FaMusic, FaBook, FaBlog, FaPhone } from 'react-icons/fa';
import SkillsSimple from './SkillsSimple';
import LandingPage from './LandingPage';

const PortfolioPage = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('portfolio');

  const topPicks = [
    { title: 'Skills', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', icon: <FaCode /> },
    { title: 'Projects', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop', icon: <FaProjectDiagram /> },
    { title: 'Certifications', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop', icon: <FaCertificate /> },
    { title: 'Experience', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop', icon: <FaBriefcase /> },
    { title: 'Recommendations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', icon: <FaThumbsUp /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop', icon: <FaEnvelope /> }
  ];

  const continueWatching = [
    { title: 'Music', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop', icon: <FaMusic /> },
    { title: 'Reading', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', icon: <FaBook /> },
    { title: 'Blogs', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop', icon: <FaBlog /> },
    { title: 'Certifications', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop', icon: <FaCertificate /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop', icon: <FaPhone /> }
  ];

  const handleTileClick = (title) => {
    if (title === 'Skills') {
      setCurrentView('skills');
    }
    // Add other navigation logic here for other tiles
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center mr-12">
              <button 
                onClick={() => setCurrentView('home')} 
                className="text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="flex space-x-8">
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Professional</button>
              <button onClick={() => setCurrentView('skills')} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Hire Me</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              KEEGAN CHETTY - SENIOR FULL STACK DEVELOPER
            </h1>
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-200 leading-relaxed">
                Dynamic and results-driven Senior Software Engineer with 5+ years in full-stack development 
                across high-impact, large-scale applications. Expertise in React, Node.js, Python, AWS, 
                Kubernetes, and Docker. Achieved serving 10,000+ users and managing 50 million+ bookings, 
                implementing robust security measures across multiple products including XSS script validation, 
                advanced password policies, and stringent password resets. Transformed a legacy reporting 
                engine into a high-speed microservices architecture, reducing report generation from 5 minutes to 5 seconds.
              </p>
            </div>
            <div className="flex justify-center space-x-6">
              <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors border border-gray-600">
                <FaPlay className="text-white" />
                <span>Resume</span>
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors border border-gray-600">
                <FaLinkedin className="text-white" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Top Picks Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Today's Top Picks for developer
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {topPicks.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-netflixRed">{item.icon}</div>
                      <span className="text-white font-semibold text-lg">{item.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Continue Watching for developer
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {continueWatching.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-netflixRed">{item.icon}</div>
                      <span className="text-white font-semibold text-lg">{item.title}</span>
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
