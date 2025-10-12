import React from 'react';
import { FaBlog, FaArrowLeft, FaHome, FaExternalLinkAlt } from 'react-icons/fa';

const BlogPage = ({ onBack, onHome }) => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Microservices with Spring Boot",
      excerpt: "Learn how to design and implement microservices architecture using Spring Boot, covering service discovery, API gateways, and distributed systems patterns.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Backend Development",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      link: "#",
      color: "from-blue-50 to-blue-100"
    },
    {
      id: 2,
      title: "Modern React Patterns and Best Practices",
      excerpt: "Exploring advanced React patterns including custom hooks, context optimization, and performance techniques for large-scale applications.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Frontend Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      link: "#",
      color: "from-green-50 to-green-100"
    },
    {
      id: 3,
      title: "DevOps Automation: CI/CD Pipeline Optimization",
      excerpt: "A comprehensive guide to setting up efficient CI/CD pipelines, container orchestration, and infrastructure as code practices.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop",
      link: "#",
      color: "from-purple-50 to-purple-100"
    },
    {
      id: 4,
      title: "Cybersecurity in Modern Web Applications",
      excerpt: "Essential security practices for web developers, covering authentication, authorization, data protection, and common vulnerabilities.",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      link: "#",
      color: "from-red-50 to-red-100"
    },
    {
      id: 5,
      title: "Database Design Patterns for High-Performance Applications",
      excerpt: "Understanding database optimization, indexing strategies, and query performance tuning for enterprise-level applications.",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Database",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
      link: "#",
      color: "from-yellow-50 to-yellow-100"
    },
    {
      id: 6,
      title: "Cloud-Native Architecture: From Monolith to Microservices",
      excerpt: "A practical journey of migrating legacy applications to cloud-native architecture using modern containerization and orchestration tools.",
      date: "2023-12-15",
      readTime: "12 min read",
      category: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      link: "#",
      color: "from-indigo-50 to-indigo-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900">
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
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button onClick={onBack} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Back</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  📝
                </div>
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={onBack}
                className="text-white text-2xl hover:text-gray-300 transition-colors"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={onHome}
              className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={onBack}
              className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
            >
              Back
            </button>
            <div className="pt-4 border-t border-gray-700">
              <button 
                onClick={onBack}
                className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  📝
                </div>
                <span>Back to Profile Selection</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <FaBlog className="text-blue-500 text-3xl mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="text-red-500">Technical</span> Blog
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on software development, architecture, and technology trends.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${post.color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Post Image */}
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  
                  {/* Post Details */}
                  <div className="text-gray-800 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <button className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <span>Read More</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg">
              "Sharing knowledge is the first step to humanity." - Unknown
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
