import React, { useState, useRef } from 'react';
import { FaLock, FaUnlock, FaUpload, FaDownload, FaArrowLeft, FaHome, FaFilePdf, FaExclamationTriangle } from 'react-icons/fa';
import { PDFDocument } from 'pdf-lib';

const UnlockPdfPage = ({ onBack, onHome }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [unlockedPdf, setUnlockedPdf] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setError('');
      setUnlockedPdf(null);
    }
  };

  const handleUnlock = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setUnlockedPdf(null);

    try {
      // Read the PDF file
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Try to load the PDF - if it's password protected, this will fail
      // Note: pdf-lib doesn't support password-protected PDFs directly
      // We'll attempt to load it and if it fails, we'll show an error
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // If we get here, the PDF was either not password-protected or we need to handle it differently
      // For password-protected PDFs, we need to use a different approach
      // Since pdf-lib doesn't support password decryption, we'll create a copy without password
      
      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();
      
      // Copy all pages from the original PDF
      const pages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => {
        newPdfDoc.addPage(page);
      });

      // Save the unlocked PDF
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setUnlockedPdf(blob);
      
    } catch (err) {
      console.error('Error unlocking PDF:', err);
      if (err.message && err.message.includes('password')) {
        setError('This PDF is password-protected. pdf-lib cannot decrypt password-protected PDFs in the browser. Please use a desktop tool or provide the password through a server-side solution.');
      } else {
        setError('Failed to unlock PDF. The file may be corrupted or encrypted. Error: ' + err.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (unlockedPdf) {
      const url = URL.createObjectURL(unlockedPdf);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.replace('.pdf', '_unlocked.pdf') || 'unlocked.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPassword('');
    setError('');
    setUnlockedPdf(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🔓
                </div>
              </button>
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
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    🔓
                  </div>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="text-blue-500">Unlock</span> PDF
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Remove password protection from your PDF files
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-800">
            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-white text-lg sm:text-xl font-semibold mb-4">
                <FaFilePdf className="inline mr-2 text-red-500" />
                Select PDF File
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <FaUpload className="text-4xl text-gray-400 mb-4" />
                  <span className="text-white font-semibold mb-2">
                    {selectedFile ? fileName : 'Click to upload PDF'}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {selectedFile ? 'Click to change file' : 'PDF files only'}
                  </span>
                </label>
              </div>
              {selectedFile && (
                <div className="mt-4 flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FaFilePdf className="text-red-500 text-2xl" />
                    <div>
                      <div className="text-white font-semibold">{fileName}</div>
                      <div className="text-gray-400 text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Password Section (Optional - for future server-side implementation) */}
            <div className="mb-8">
              <label className="block text-white text-sm font-semibold mb-2">
                <FaLock className="inline mr-2" />
                PDF Password (if required)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PDF password if the file is password-protected"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <p className="text-gray-400 text-xs mt-2">
                Note: Browser-based PDF unlocking has limitations. Password-protected PDFs may require server-side processing.
              </p>
            </div>

            {/* Unlock Button */}
            <button
              onClick={handleUnlock}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 mb-6"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaUnlock />
                  <span>Unlock PDF</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-start space-x-3">
                <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Error</div>
                  <div className="text-sm">{error}</div>
                </div>
              </div>
            )}

            {/* Success Message and Download */}
            {unlockedPdf && !error && (
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FaUnlock className="text-green-400 text-2xl" />
                    <div>
                      <div className="text-green-400 font-semibold text-lg">PDF Unlocked Successfully!</div>
                      <div className="text-gray-300 text-sm">Your PDF is ready to download</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <FaDownload />
                  <span>Download Unlocked PDF</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Process Another File
                </button>
              </div>
            )}

            {/* Information Box */}
            <div className="mt-8 bg-blue-900/20 rounded-lg p-4 border border-blue-700/50">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Important Information</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• This tool works best with PDFs that are not password-protected</li>
                <li>• Password-protected PDFs require server-side processing (not available in browser-only solutions)</li>
                <li>• All processing happens in your browser - files are never uploaded to a server</li>
                <li>• Maximum file size recommended: 50MB</li>
                <li>• The unlocked PDF will be downloaded automatically when ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockPdfPage;

