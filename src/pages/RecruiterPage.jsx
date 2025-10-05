import React, { useState } from 'react';
import { FaPlay, FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaCertificate, FaBriefcase, FaThumbsUp, FaEnvelope, FaMusic, FaBook, FaBlog, FaPhone } from 'react-icons/fa';
import SkillsSimple from './SkillsSimple';

const RecruiterPage = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('recruiter');

  const topPicks = [
    { title: 'Work Permit', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', icon: <FaCertificate /> },
    { title: 'Skills', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop', icon: <FaCode /> },
    { title: 'Experience', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', icon: <FaBriefcase /> },
    { title: 'Certifications', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop', icon: <FaCertificate /> },
    { title: 'Recommendations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', icon: <FaThumbsUp /> },
    { title: 'Projects', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop', icon: <FaProjectDiagram /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop', icon: <FaEnvelope /> }
  ];

  const continueWatching = [
    { title: 'Music', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop', icon: <FaMusic /> },
    { title: 'Reading', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', icon: <FaBook /> },
    { title: 'Blogs', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop', icon: <FaBlog /> },
    { title: 'Contact Me', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop', icon: <FaPhone /> }
  ];

  const handleTileClick = (title) => {
    if (title === 'Skills') {
      setCurrentView('skills');
    }
    // Add other navigation logic here for other tiles
  };

  // If skills view is selected, show skills page
  if (currentView === 'skills') {
    return <SkillsSimple onBack={() => setCurrentView('recruiter')} onHome={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center mr-12">
              <button 
                onClick={onBack} 
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
      <div className="relative pt-20 min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop")',
            filter: 'blur(2px)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Keegan Chetty - Senior Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Experienced full-stack developer with expertise in React, Node.js, Python, and cloud technologies. 
            Successfully delivered scalable applications serving thousands of users, implemented robust security measures, 
            and transformed legacy systems into modern, efficient solutions. Passionate about creating innovative 
            solutions and optimizing system performance for maximum impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black/80 hover:bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105">
              <FaPlay className="text-white" />
              <span className="text-lg font-semibold">Resume</span>
            </button>
            <button className="bg-black/80 hover:bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105">
              <FaLinkedin className="text-white" />
              <span className="text-lg font-semibold">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Top Picks for Recruiter */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Today's Top Picks for recruiter</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {topPicks.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
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
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Continue Watching for recruiter</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {continueWatching.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(item.title)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
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
