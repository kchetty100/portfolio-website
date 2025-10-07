import React, { useState } from 'react';
import { FaBriefcase, FaEye, FaEyeSlash } from 'react-icons/fa';

const experiences = [
  {
    title: 'Discovery – Software Developer',
    period: 'Aug 2021 – Dec 2022',
    summary: 'Full-stack contributions across services and UI with a focus on quality, reliability and performance.'
  },
  {
    title: 'First National Bank (FNB) – Java Software Developer',
    period: 'Jul 2020 – Jul 2021',
    summary: 'Enterprise Java development, APIs and integrations supporting high-availability banking workloads.'
  },
  {
    title: 'WesBank – Security Software Developer',
    period: 'Sep 2019 – Jun 2020',
    summary: 'Security-focused engineering including policy enforcement, auth flows and secure SDLC practices.'
  },
  {
    title: 'WesBank – Software Developer',
    period: 'Aug 2017 – Aug 2019',
    summary: 'Core feature delivery across internal platforms using modern engineering practices.'
  }
];

const ExperiencePage = ({ onBack, onHome }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {/* Password Protection Overlay */}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="bg-black/80 border border-red-700 rounded-xl p-8 w-96 text-center shadow-[0_0_25px_rgba(229,9,20,0.5)]">
            <div className="flex items-center justify-center mb-6">
              <FaBriefcase className="text-red-500 text-4xl mr-4" />
              <h2 className="text-2xl font-bold text-white">Experience Access</h2>
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
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onHome}
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={handleBackToPassword} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Lock</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block relative">
            Work Experience & Education Timeline
            <span className="block absolute -bottom-1 left-0 right-0 mx-auto h-0.5 bg-netflixRed"></span>
          </h1>
        </div>
      </header>

      {/* Timeline */}
      <main className="px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-800 rounded"></div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={exp.title} className="relative">
                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-netflixRed flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-netflixRed"></div>
                  </div>

                  {/* Card */}
                  <div className={
                    `mt-1 pt-8 grid ${isLeft ? 'md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)]' : 'md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)]'}`
                  }>
                    {/* Left/Right spacer */}
                    {isLeft ? (
                      <div className="md:pr-6 order-1">
                        <div className="bg-gray-900 rounded-lg p-5 shadow hover:bg-gray-800 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold">{exp.title}</h3>
                            <span className="text-sm text-gray-400">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">{exp.summary}</p>
                        </div>
                      </div>
                    ) : <div className="order-1" />}

                    {/* Middle spacer */}
                    <div className="hidden md:block order-2" />

                    {isLeft ? (
                      <div className="order-3" />
                    ) : (
                      <div className="md:pl-6 order-3">
                        <div className="bg-gray-900 rounded-lg p-5 shadow hover:bg-gray-800 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold">{exp.title}</h3>
                            <span className="text-sm text-gray-400">{exp.period}</span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">{exp.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperiencePage;


