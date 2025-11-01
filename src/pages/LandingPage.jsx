import React, { useState, useEffect } from 'react';
import { FaCode, FaUserTie, FaEye, FaRocket } from 'react-icons/fa';
import PortfolioPage from './PortfolioPage';
import RecruiterPage from './RecruiterPage';
import StalkerPage from './StalkerPage';
import AdventurerPage from './AdventurerPage';

const LandingPage = () => {
  // Initialize state from URL hash or default to null
  const getInitialProfile = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'recruiter' || hash === 'developer' || hash === 'stalker' || hash === 'adventurer') {
      return hash;
    }
    return null;
  };

  const [selectedProfile, setSelectedProfile] = useState(getInitialProfile);

  const profiles = [
    {
      id: 'recruiter',
      name: 'Recruiter',
      color: 'bg-teal-500',
      icon: <FaUserTie className="text-white text-4xl" />,
      description: 'View my professional experience and qualifications'
    },
    {
      id: 'developer',
      name: 'Developer',
      color: 'bg-gray-500',
      icon: <FaCode className="text-white text-4xl" />,
      description: 'Explore my technical skills and projects'
    },
    {
      id: 'stalker',
      name: 'Stalker',
      color: 'bg-red-500',
      icon: <FaEye className="text-white text-4xl" />,
      description: 'Browse my social media and personal content'
    },
    {
      id: 'adventurer',
      name: 'Adventurer',
      color: 'bg-orange-500',
      icon: <FaRocket className="text-white text-4xl" />,
      description: 'Discover my creative side and interests'
    }
  ];

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'recruiter' || hash === 'developer' || hash === 'stalker' || hash === 'adventurer') {
        setSelectedProfile(hash);
      } else {
        setSelectedProfile(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProfileClick = (profileId) => {
    setSelectedProfile(profileId);
    // Update URL hash and push to history
    window.history.pushState({ profile: profileId }, '', `#${profileId}`);
  };

  const handleBack = () => {
    setSelectedProfile(null);
    // Update URL to remove hash and push to history
    const url = window.location.pathname + window.location.search;
    window.history.pushState({ profile: null }, '', url);
  };

  // If developer profile is selected, show portfolio page
  if (selectedProfile === 'developer') {
    return <PortfolioPage onBack={handleBack} />;
  }

  // If recruiter profile is selected, show recruiter page
  if (selectedProfile === 'recruiter') {
    return <RecruiterPage onBack={handleBack} />;
  }

  // If stalker profile is selected, show stalker page
  if (selectedProfile === 'stalker') {
    return <StalkerPage onBack={handleBack} />;
  }

  // If adventurer profile is selected, show adventurer page
  if (selectedProfile === 'adventurer') {
    return <AdventurerPage onBack={handleBack} onHome={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8 sm:py-0">
      <div className="text-center w-full max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-12 md:mb-16 font-netflix px-4">
          Who's Watching?
        </h1>

        {/* Profile Selection */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 px-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform duration-200"
              onClick={() => handleProfileClick(profile.id)}
            >
              {/* Profile Icon */}
              <div className={`
                w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg ${profile.color} 
                flex items-center justify-center mb-3 sm:mb-4
                group-hover:scale-110 group-active:scale-105 transition-transform duration-300
                group-hover:shadow-2xl group-hover:shadow-red-500/20
                border-2 border-transparent group-hover:border-netflixRed/50
                relative overflow-hidden touch-manipulation
              `}>
                {/* Fluffy texture effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-3 left-4 w-1 h-1 bg-white/30 rounded-full"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl">
                    {profile.icon}
                  </div>
                </div>
                
                {/* Eyes */}
                <div className="absolute top-8 left-6 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-8 right-6 w-2 h-2 bg-black rounded-full"></div>
                
                {/* Smile */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-1 border-b-2 border-black rounded-full"></div>
              </div>

              {/* Profile Name */}
              <span className="text-white text-base sm:text-lg md:text-xl font-medium group-hover:text-netflixRed transition-colors duration-300">
                {profile.name}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-4">
          Select a profile to explore different aspects of my professional journey
        </div>

        {/* Navigation hint */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-gray-500 text-xs sm:text-sm px-4">
          Click on any profile to continue
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
