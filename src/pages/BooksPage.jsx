import React from 'react';
import { FaBook, FaArrowLeft, FaHome } from 'react-icons/fa';

const BooksPage = ({ onBack, onHome }) => {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      description: "A practical guide to building good habits and breaking bad ones.",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      color: "from-amber-50 to-amber-100"
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      description: "A magical journey of following one's dreams.",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      color: "from-amber-50 to-amber-100"
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
                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  📚
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  📚
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
              <FaBook className="text-green-500 text-3xl mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="text-red-500">Books</span> That Shaped My Journey
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              These books have influenced my perspectives, motivation, and self-growth.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${book.color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}>
                  {/* Book Cover */}
                  <div className="mb-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  
                  {/* Book Details */}
                  <div className="text-gray-800">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600 mb-3">
                      by {book.author}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg">
              "A room without books is like a body without a soul." - Cicero
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
