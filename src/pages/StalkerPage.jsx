import React, { useState } from 'react';
import { FaEye, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaYoutube, FaTiktok, FaSnapchat, FaDiscord, FaReddit, FaArrowLeft, FaHome } from 'react-icons/fa';

const StalkerPage = ({ onBack, onHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialPlatforms = [
    {
      id: 1,
      name: 'Instagram',
      icon: <FaInstagram className="text-4xl" />,
      username: '@keegan_chetty',
      followers: '2.5K',
      description: 'Daily life, coding adventures, and random thoughts',
      color: 'from-pink-500 to-purple-600',
      link: 'https://instagram.com/keegan_chetty'
    },
    {
      id: 2,
      name: 'Twitter',
      icon: <FaTwitter className="text-4xl" />,
      username: '@keegan_dev',
      followers: '1.8K',
      description: 'Tech tweets, memes, and developer rants',
      color: 'from-blue-400 to-blue-600',
      link: 'https://twitter.com/keegan_dev'
    },
    {
      id: 3,
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-4xl" />,
      username: 'Keegan Chetty',
      followers: '5.2K',
      description: 'Professional updates and career milestones',
      color: 'from-blue-600 to-blue-800',
      link: 'https://linkedin.com/in/keegan-chetty'
    },
    {
      id: 4,
      name: 'GitHub',
      icon: <FaGithub className="text-4xl" />,
      username: 'kchetty100',
      followers: '890',
      description: 'Code repositories and open source contributions',
      color: 'from-gray-700 to-gray-900',
      link: 'https://github.com/kchetty100'
    },
    {
      id: 5,
      name: 'YouTube',
      icon: <FaYoutube className="text-4xl" />,
      username: 'Keegan Codes',
      followers: '3.1K',
      description: 'Coding tutorials and tech reviews',
      color: 'from-red-500 to-red-700',
      link: 'https://youtube.com/@keegancodes'
    },
    {
      id: 6,
      name: 'TikTok',
      icon: <FaTiktok className="text-4xl" />,
      username: '@keegan_codes',
      followers: '12.5K',
      description: 'Quick coding tips and behind-the-scenes',
      color: 'from-black to-gray-800',
      link: 'https://tiktok.com/@keegan_codes'
    },
    {
      id: 7,
      name: 'Discord',
      icon: <FaDiscord className="text-4xl" />,
      username: 'Keegan#1234',
      followers: 'Server: 500+',
      description: 'Gaming and developer community',
      color: 'from-indigo-500 to-purple-600',
      link: 'https://discord.gg/keegan-dev'
    },
    {
      id: 8,
      name: 'Reddit',
      icon: <FaReddit className="text-4xl" />,
      username: 'u/keegan_dev',
      followers: '2.1K',
      description: 'Tech discussions and programming help',
      color: 'from-orange-500 to-red-600',
      link: 'https://reddit.com/u/keegan_dev'
    }
  ];

  const personalContent = [
    {
      id: 1,
      title: 'Morning Routine',
      type: 'Story',
      content: 'Coffee, code, and chaos - the perfect start to any day ☕️',
      timestamp: '2 hours ago',
      platform: 'Instagram'
    },
    {
      id: 2,
      title: 'Debugging Life',
      type: 'Post',
      content: 'Spent 3 hours debugging a simple typo. The bug was in my brain, not the code 🐛',
      timestamp: '5 hours ago',
      platform: 'Twitter'
    },
    {
      id: 3,
      title: 'New Project Alert',
      type: 'Update',
      content: 'Just pushed a new feature to production. Fingers crossed it doesn\'t break everything! 🚀',
      timestamp: '1 day ago',
      platform: 'LinkedIn'
    },
    {
      id: 4,
      title: 'Code Review',
      type: 'Comment',
      content: 'This code is so clean, it makes me want to cry happy tears 😭',
      timestamp: '2 days ago',
      platform: 'GitHub'
    }
  ];

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
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Back</button>
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
                  onHome();
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onBack();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Back
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-20 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <FaEye className="text-red-500 text-4xl mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="text-red-500">Stalk</span> My Digital Life
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to my social media universe! Follow me across platforms and see what I'm up to.
            </p>
          </div>

          {/* Social Platforms Grid */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Social Media Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${platform.color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}>
                    <div className="text-center text-white">
                      <div className="mb-4 flex justify-center">
                        {platform.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gray-200 transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-sm font-semibold mb-2 opacity-90">
                        {platform.username}
                      </p>
                      <p className="text-sm mb-3 opacity-80">
                        {platform.followers} followers
                      </p>
                      <p className="text-xs opacity-70 leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalContent.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.type}
                    </span>
                    <span className="text-gray-400 text-sm">{item.timestamp}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-3">{item.content}</p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="mr-2">Posted on</span>
                    <span className="text-red-400 font-semibold">{item.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">
              "Privacy is dead, but at least I'm having fun!" 😄
            </p>
            <p className="text-gray-500 text-sm">
              All links are fictional for demonstration purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StalkerPage;
