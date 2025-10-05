import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SkillCard from '../components/SkillCard';
import Footer from '../components/Footer';
import { fetchSkills } from '../lib/datoCmsClient';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Filter skills based on selected category and search term
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.technologyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        skill.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group skills by category for display
  const groupedSkills = selectedCategory === 'All' 
    ? categories.slice(1).reduce((acc, category) => {
        const categorySkills = skills.filter(skill => 
          skill.category === category && 
          skill.technologyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (categorySkills.length > 0) {
          acc[category] = categorySkills;
        }
        return acc;
      }, {})
    : { [selectedCategory]: filteredSkills };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflixRed mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              My <span className="text-netflixRed">Skills</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up">
              A comprehensive showcase of technologies and tools I work with, 
              organized by category and proficiency level.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-netflixGray/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-netflixRed focus:ring-1 focus:ring-netflixRed transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-netflixRed text-white shadow-lg shadow-netflixRed/25'
                      : 'bg-netflixGray/50 text-gray-300 hover:bg-netflixGray hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {selectedCategory === 'All' ? (
            // Display grouped by category
            Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {category}
                  <span className="block text-sm font-normal text-gray-400 mt-2">
                    {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      technologyName={skill.technologyName}
                      category={skill.category}
                      proficiency={skill.proficiency}
                      description={skill.description}
                      icon={skill.icon}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Display filtered skills
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  technologyName={skill.technologyName}
                  category={skill.category}
                  proficiency={skill.proficiency}
                  description={skill.description}
                  icon={skill.icon}
                />
              ))}
            </div>
          )}

          {/* No results message */}
          {filteredSkills.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No skills found</h3>
              <p className="text-gray-400">
                Try adjusting your search term or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;
