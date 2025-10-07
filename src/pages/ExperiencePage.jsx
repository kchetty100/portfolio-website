import React from 'react';

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
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Back</button>
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


