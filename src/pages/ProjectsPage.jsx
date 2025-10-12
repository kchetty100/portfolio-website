import React, { useEffect, useState } from 'react';

const GITHUB_USERNAME = 'kchetty100';

const ProjectsPage = ({ onBack, onHome }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newReposCount, setNewReposCount] = useState(0);

  const fetchRepos = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      }
      
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} repositories from GitHub API`);
      
      // Check for new repositories
      if (repos.length > 0 && showRefreshIndicator) {
        const newRepos = data.filter(newRepo => 
          !repos.some(existingRepo => existingRepo.id === newRepo.id)
        );
        if (newRepos.length > 0) {
          setNewReposCount(newRepos.length);
          // Clear notification after 5 seconds
          setTimeout(() => setNewReposCount(0), 5000);
        }
      }
      
      setRepos(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRepos();

    // Set up periodic refresh every 5 minutes (300000ms)
    const refreshInterval = setInterval(() => {
      fetchRepos(true);
    }, 300000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Projects</h1>
              {!loading && !error && repos.length > 0 && (
                <p className="text-gray-400 text-sm mt-1">
                  Showing {repos.length} {repos.length === 1 ? 'repository' : 'repositories'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              {isRefreshing && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  Refreshing...
                </div>
              )}
              <button
                onClick={() => fetchRepos(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                disabled={isRefreshing}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
              </button>
            </div>
          </div>

          {newReposCount > 0 && (
            <div className="mb-4 p-4 bg-green-900/30 border border-green-500 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🎉</span>
                <span className="text-green-400 font-semibold">
                  {newReposCount} new {newReposCount === 1 ? 'repository' : 'repositories'} detected!
                </span>
              </div>
            </div>
          )}

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


