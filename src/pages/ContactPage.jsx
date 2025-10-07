import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaArrowLeft, FaHome, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

const ContactPage = ({ onBack, onHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      value: 'backroads317@gmail.com',
      link: 'mailto:backroads317@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Location',
      value: 'South Africa',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-2xl" />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/keegan-chetty',
      color: 'hover:text-blue-500'
    },
    {
      icon: <FaGithub className="text-2xl" />,
      name: 'GitHub',
      url: 'https://github.com/kchetty100',
      color: 'hover:text-gray-400'
    },
    {
      icon: <FaTwitter className="text-2xl" />,
      name: 'Twitter',
      url: 'https://twitter.com/keegan_dev',
      color: 'hover:text-blue-400'
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
              <button onClick={() => { /* Skills navigation */ }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Skills</button>
              <button onClick={() => { /* Experience navigation */ }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Experience</button>
              <button onClick={() => { /* Books navigation */ }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Books</button>
              <button onClick={() => { /* Projects navigation */ }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Projects</button>
              <button onClick={() => { /* Contact navigation */ }} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Contact</button>
              <a href="https://github.com/kchetty100" target="_blank" rel="noreferrer" className="text-white font-bold text-lg hover:text-gray-300 transition-colors">GitHub</a>
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
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Skills
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Experience
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Books
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Projects
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">
                Contact
              </button>
              <a href="https://github.com/kchetty100" target="_blank" rel="noreferrer" className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2">GitHub</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-red-500">Get In</span> Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="text-red-500">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{info.title}</h3>
                        <a 
                          href={info.link}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors duration-300`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Available for new projects</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Send Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      <FaUser className="inline mr-2" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    <FaComment className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
