import React, { useState } from 'react';
import { FaCode, FaUserTie, FaEye, FaRocket } from 'react-icons/fa';
import PortfolioPage from './PortfolioPage';
import RecruiterPage from './RecruiterPage';

const LandingPage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

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

  const handleProfileClick = (profileId) => {
    setSelectedProfile(profileId);
  };

  // If developer profile is selected, show portfolio page
  if (selectedProfile === 'developer') {
    return <PortfolioPage onBack={() => setSelectedProfile(null)} />;
  }

  // If recruiter profile is selected, show recruiter page
  if (selectedProfile === 'recruiter') {
    return <RecruiterPage onBack={() => setSelectedProfile(null)} />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-16 font-netflix">
          Who's Watching?
        </h1>

        {/* Profile Selection */}
        <div className="flex justify-center gap-8 mb-8">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleProfileClick(profile.id)}
            >
              {/* Profile Icon */}
              <div className={`
                w-32 h-32 rounded-lg ${profile.color} 
                flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
                group-hover:shadow-2xl group-hover:shadow-red-500/20
                border-2 border-transparent group-hover:border-netflixRed/50
                relative overflow-hidden
              `}>
                {/* Fluffy texture effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-3 left-4 w-1 h-1 bg-white/30 rounded-full"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  {profile.icon}
                </div>
                
                {/* Eyes */}
                <div className="absolute top-8 left-6 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-8 right-6 w-2 h-2 bg-black rounded-full"></div>
                
                {/* Smile */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-1 border-b-2 border-black rounded-full"></div>
              </div>

              {/* Profile Name */}
              <span className="text-white text-xl font-medium group-hover:text-netflixRed transition-colors duration-300">
                {profile.name}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select a profile to explore different aspects of my professional journey
        </div>

        {/* Navigation hint */}
        <div className="mt-8 text-gray-500 text-sm">
          Click on any profile to continue
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
