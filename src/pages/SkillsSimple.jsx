import React, { useState } from 'react';
import { FaReact, FaJs, FaNodeJs, FaJava, FaDocker, FaAws, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiRubyonrails, SiPhp, SiSpring, SiKubernetes, SiNetlify, SiHeroku, SiGooglecloud, SiMysql, SiPostgresql, SiTypescript, SiDocker } from 'react-icons/si';

const SkillsSimple = ({ onBack, onHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
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
              <a href="#" className="text-white font-bold text-lg">Skills</a>
              <a href="#" className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</a>
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
              <a href="#" className="block w-full text-left text-white font-bold text-lg py-2">
                Skills
              </a>
              <a href="#" className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Projects
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Frontend Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative inline-block">
                Frontend
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-netflixRed"></div>
              </h2>
            </div>
            {/* Upside-down pyramid: first row 3, second row 1 (centered) */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex justify-center gap-4 sm:gap-6">
                {/* HTML&CSS */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex space-x-1 mb-3 group-hover:scale-110 transition-transform">
                      <FaHtml5 className="text-netflixRed text-2xl" />
                      <FaCss3Alt className="text-netflixRed text-2xl" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">HTML&CSS</h3>
                    <p className="text-gray-400 text-sm">Web Markup and Styling</p>
                  </div>
                </div>
                {/* JavaScript */}
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <FaJs className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">JavaScript</h3>
                    <p className="text-gray-400 text-sm">Scripting Language</p>
                  </div>
                </div>
                {/* TypeScript */}
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <SiTypescript className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">TypeScript</h3>
                    <p className="text-gray-400 text-sm">Type-safe JavaScript</p>
                  </div>
                </div>
              </div>
              {/* Row 2 centered single */}
              <div className="flex justify-center">
                {/* React */}
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <FaReact className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">React</h3>
                    <p className="text-gray-400 text-sm">Frontend Framework</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backend Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative inline-block">
                Backend
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-netflixRed"></div>
              </h2>
            </div>
            {/* Pyramid: first row 4, second row 1 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex justify-center gap-4 sm:gap-6">
              {/* Ruby on Rails */}
              <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                <div className="flex flex-col items-center text-center">
                  <SiRubyonrails className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Ruby on Rails</h3>
                  <p className="text-gray-400 text-sm">Backend Framework</p>
                </div>
              </div>

              {/* PHP */}
              <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                <div className="flex flex-col items-center text-center">
                  <SiPhp className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">PHP</h3>
                  <p className="text-gray-400 text-sm">Backend Language</p>
                </div>
              </div>

              {/* Java */}
              <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                <div className="flex flex-col items-center text-center">
                  <FaJava className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Java</h3>
                  <p className="text-gray-400 text-sm">Object-Oriented Programming Language</p>
                </div>
              </div>

              {/* SpringBoot */}
              <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                <div className="flex flex-col items-center text-center">
                  <SiSpring className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">SpringBoot</h3>
                  <p className="text-gray-400 text-sm">Java Framework</p>
                </div>
              </div>
              </div>

              {/* Row 2 single centered */}
              <div className="flex justify-center">
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <FaNodeJs className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">Node.js</h3>
                    <p className="text-gray-400 text-sm">Backend Runtime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cloud & DevOps Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative inline-block">
                Cloud & DevOps
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-netflixRed"></div>
              </h2>
            </div>
            {/* Inverted pyramid: row of 4, row of 2, row of 1 */}
            <div className="flex flex-col items-center gap-6">
              {/* Row 1: 4 tiles */}
              <div className="flex justify-center gap-4 sm:gap-6">
                {/* CI/CD */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
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
                {/* Kubernetes */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <SiKubernetes className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">Kubernetes</h3>
                    <p className="text-gray-400 text-sm">Container Orchestration</p>
                  </div>
                </div>
                {/* Docker */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <FaDocker className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">Docker</h3>
                    <p className="text-gray-400 text-sm">Containerization</p>
                  </div>
                </div>
                {/* GCP */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <SiGooglecloud className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">GCP</h3>
                    <p className="text-gray-400 text-sm">Google Cloud Platform</p>
                  </div>
                </div>
              </div>
              {/* Row 2: 3 tiles centered (add Jenkins) */}
              <div className="flex justify-center gap-4 sm:gap-6">
                {/* Jenkins */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-10 h-10 text-netflixRed mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 017 7v4a7 7 0 11-14 0V9a7 7 0 017-7zm1 13.93A5.001 5.001 0 0017 11V9a5 5 0 10-10 0v2a5.001 5.001 0 004 4.93V18H9v2h6v-2h-2v-2.07z"/></svg>
                    <h3 className="text-white font-bold text-lg mb-1">Jenkins</h3>
                    <p className="text-gray-400 text-sm">Automation Server</p>
                  </div>
                </div>
                {/* Netlify */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <SiNetlify className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">Netlify</h3>
                    <p className="text-gray-400 text-sm">Frontend Deployment Platform</p>
                  </div>
                </div>
                {/* Heroku */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <SiHeroku className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">Heroku</h3>
                    <p className="text-gray-400 text-sm">Cloud Platform for Apps</p>
                  </div>
                </div>
              </div>
              {/* Row 3: 3 tiles centered (OpenShift, Podman, AWS) */}
              <div className="flex justify-center gap-4 sm:gap-6">
                {/* OpenShift */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-10 h-10 text-netflixRed mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4a8 8 0 100 16 8 8 0 000-16zm5 8a5 5 0 11-10 0 5 5 0 0110 0z"/></svg>
                    <h3 className="text-white font-bold text-lg mb-1">OpenShift</h3>
                    <p className="text-gray-400 text-sm">Red Hat Platform</p>
                  </div>
                </div>
                {/* Podman */}
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-40 sm:w-48">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-10 h-10 text-netflixRed mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12h18M12 3v18"/></svg>
                    <h3 className="text-white font-bold text-lg mb-1">Podman</h3>
                    <p className="text-gray-400 text-sm">Container Engine</p>
                  </div>
                </div>
                {/* AWS */}
                <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-48">
                  <div className="flex flex-col items-center text-center">
                    <FaAws className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-lg mb-1">AWS</h3>
                    <p className="text-gray-400 text-sm">Cloud Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Databases Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative inline-block">
                Databases
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-netflixRed"></div>
              </h2>
            </div>
            <div className="flex justify-center gap-6">
              {/* MySQL */}
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-48">
                <div className="flex flex-col items-center text-center">
                  <SiMysql className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">MySQL</h3>
                  <p className="text-gray-400 text-sm">Relational Database</p>
                </div>
              </div>

              {/* PostgreSQL */}
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-48">
                <div className="flex flex-col items-center text-center">
                  <SiPostgresql className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">PostgreSQL</h3>
                  <p className="text-gray-400 text-sm">Relational Database</p>
                </div>
              </div>
            </div>
          </div>


          {/* Other Tools & Practices Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white relative inline-block">
                Other Tools & Practices
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-netflixRed"></div>
              </h2>
            </div>
            <div className="flex justify-center gap-6">
              {/* Dockerization */}
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-48">
                <div className="flex flex-col items-center text-center">
                  <SiDocker className="text-netflixRed text-4xl mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg mb-1">Dockerization</h3>
                  <p className="text-gray-400 text-sm">Container Management</p>
                </div>
              </div>

              {/* Agile */}
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 skill-card-hover group w-48">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-netflixRed rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">Agile</h3>
                  <p className="text-gray-400 text-sm">Development Methodology</p>
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
