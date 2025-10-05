import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaJava, FaDocker, FaAws } from 'react-icons/fa';
import { SiRubyonrails, SiPhp, SiSpring, SiKubernetes, SiNetlify, SiHeroku, SiGooglecloud } from 'react-icons/si';

const SkillsSimple = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">KEEGAN</span>
              <span className="text-2xl font-bold text-netflixRed">CHETTY</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Professional</a>
              <a href="#" className="text-white font-medium">Skills</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Hire Me</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Backend Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 relative">
              Backend
              <div className="absolute bottom-0 left-0 w-24 h-1 bg-netflixRed"></div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Ruby on Rails */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiRubyonrails className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Ruby on Rails</h3>
                  <p className="text-gray-400 text-sm">Backend Framework</p>
                </div>
              </div>

              {/* PHP */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiPhp className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">PHP</h3>
                  <p className="text-gray-400 text-sm">Backend Language</p>
                </div>
              </div>

              {/* Java */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <FaJava className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Java</h3>
                  <p className="text-gray-400 text-sm">Object-Oriented Programming Language</p>
                </div>
              </div>

              {/* SpringBoot */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiSpring className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">SpringBoot</h3>
                  <p className="text-gray-400 text-sm">Java Framework</p>
                </div>
              </div>

              {/* Node.js */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <FaNodeJs className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Node.js</h3>
                  <p className="text-gray-400 text-sm">Backend Runtime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cloud & DevOps Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 relative">
              Cloud & DevOps
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-netflixRed"></div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* CI/CD */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-netflixRed rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">CI/CD</h3>
                  <p className="text-gray-400 text-sm">Continuous Integration & Delivery</p>
                </div>
              </div>

              {/* Netlify */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiNetlify className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Netlify</h3>
                  <p className="text-gray-400 text-sm">Frontend Deployment Platform</p>
                </div>
              </div>

              {/* Heroku */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiHeroku className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Heroku</h3>
                  <p className="text-gray-400 text-sm">Cloud Platform for Apps</p>
                </div>
              </div>

              {/* Kubernetes */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiKubernetes className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Kubernetes</h3>
                  <p className="text-gray-400 text-sm">Container Orchestration</p>
                </div>
              </div>

              {/* Docker */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <FaDocker className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Docker</h3>
                  <p className="text-gray-400 text-sm">Containerization</p>
                </div>
              </div>

              {/* GCP */}
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <SiGooglecloud className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">GCP</h3>
                  <p className="text-gray-400 text-sm">Google Cloud Platform</p>
                </div>
              </div>
            </div>

            {/* AWS - positioned below CI/CD */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors group">
                <div className="flex flex-col items-center text-center">
                  <FaAws className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">AWS</h3>
                  <p className="text-gray-400 text-sm">Cloud Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSimple;
