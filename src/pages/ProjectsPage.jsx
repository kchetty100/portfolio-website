import React, { useEffect, useState } from 'react';

const GITHUB_USERNAME = 'kchetty100';

const ProjectsPage = ({ onBack, onHome }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=24`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar (match recruiter) */}
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
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Professional</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-white font-bold text-lg hover:text-gray-300 transition-colors">GitHub</a>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  📁
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Projects</h1>
          </div>

          {loading && (
            <div className="text-gray-400">Loading projects...</div>
          )}

          {error && (
            <div className="text-red-400">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {repos.map((repo) => (
                <div key={repo.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold group-hover:text-netflixRed transition-colors break-words">
                        {repo.name}
                      </h3>
                      {repo.stargazers_count > 0 && (
                        <span className="text-sm text-gray-400">★ {repo.stargazers_count}</span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{repo.description}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{repo.language || 'Mixed'}</span>
                      <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center bg-black text-white px-4 py-2 rounded border border-gray-600 hover:bg-gray-800 transition-colors"
                      >
                        GitHub
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center bg-netflixRed text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;


