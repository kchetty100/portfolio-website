import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStop, FaStepBackward, FaStepForward, FaVolumeUp, FaRandom, FaRedo, FaMusic, FaHome } from 'react-icons/fa';

const MusicPage = ({ onBack, onHome }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [equalizerOn, setEqualizerOn] = useState(true);
  const [playlistVisible, setPlaylistVisible] = useState(true);
  const [eqBands, setEqBands] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showVideo, setShowVideo] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const playlist = [
    { id: 1, title: "Mori Calliope - Go-Getters", duration: "3:15", artist: "Mori Calliope", type: "audio" },
    { id: 2, title: "CircusP - Goodbye", duration: "3:24", artist: "CircusP", type: "audio" },
    { id: 3, title: "AmaLee - Siren", duration: "4:02", artist: "AmaLee", type: "audio" },
    { id: 4, title: "Crusher-P - Echo", duration: "3:50", artist: "Crusher-P", type: "audio" },
    { id: 5, title: "M83 - Midnight City", duration: "4:03", artist: "M83", type: "audio" },
    { id: 6, title: "Sunnexo - Please Wait", duration: "4:15", artist: "Sunnexo", type: "audio" },
    { id: 7, title: "Omaru Polka - Persona", duration: "4:56", artist: "Omaru Polka", type: "audio" },
    { id: 8, title: "Daft Punk - Digital Love", duration: "4:35", artist: "Daft Punk", type: "audio" },
    { id: 9, title: "Porter Robinson - Language", duration: "6:08", artist: "Porter Robinson", type: "audio" },
    { id: 10, title: "Deadmau5 - Strobe", duration: "10:37", artist: "Deadmau5", type: "audio" },
    { id: 11, title: "Skrillex - Bangarang", duration: "3:35", artist: "Skrillex", type: "audio" },
    { id: 12, title: "Madeon - All My Friends", duration: "3:24", artist: "Madeon", type: "audio" },
    { id: 13, title: "Michael Gray - The Weekend", duration: "3:45", artist: "Michael Gray", type: "video", videoSrc: "/Michael Gray - The Weekend (Official Video).mp4" }
  ];

  const eqFrequencies = ['70', '100', '320', '600', '1K', '3K', '6K', '12K', '14K', '16K'];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    return playlist.reduce((total, track) => {
      const [mins, secs] = track.duration.split(':').map(Number);
      return total + mins * 60 + secs;
    }, 0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentTrack + 1) % playlist.length;
    }
    setCurrentTrack(nextIndex);
    const track = playlist[nextIndex];
    if (track && track.type === 'video') {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  };

  const handlePrevious = () => {
    const prevIndex = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevIndex);
    const track = playlist[prevIndex];
    if (track && track.type === 'video') {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  };

  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
    const track = playlist[index];
    if (track && track.type === 'video') {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
  };

  const handleEqBandChange = (index, value) => {
    const newBands = [...eqBands];
    newBands[index] = parseInt(value);
    setEqBands(newBands);
  };

  // Simulate time progression
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const trackDuration = playlist[currentTrack] ? 
            playlist[currentTrack].duration.split(':').map(Number).reduce((a, b) => a * 60 + b) : 0;
          if (prev >= trackDuration) {
            if (repeat) {
              return 0;
            } else {
              handleNext();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, repeat]);

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
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 hover:from-orange-400 hover:to-yellow-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back to Profile Selection"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🎵
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center text-white font-bold text-sm">
                    🎵
                  </div>
                  <span>Back to Profile Selection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Winamp Interface */}
      <div className="pt-20 px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Winamp Player */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden">
            
            {/* Title Bar */}
            <div className="bg-gray-700 px-3 py-1 flex items-center justify-between">
              <span className="text-white font-bold text-sm">WINAMP</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Main Display */}
            <div className="bg-black p-4">
              <div className="text-center mb-4">
                <div className="text-4xl font-mono text-green-400 mb-2">
                  {formatTime(currentTime)}
                </div>
                <div className="text-white text-lg font-semibold">
                  {playlist[currentTrack]?.title || 'No Track Selected'}
                </div>
                <div className="text-gray-400 text-sm">
                  128 kbps • 48 KHz • STEREO
                </div>
              </div>

              {/* Visualizer */}
              <div className="flex justify-center space-x-1 mb-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-green-400 w-1 h-8 animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: `${Math.random() * 20 + 10}px`
                    }}
                  ></div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={handlePrevious}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                >
                  <FaStepBackward />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={handleStop}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                >
                  <FaStop />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                >
                  <FaStepForward />
                </button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setShuffle(!shuffle)}
                  className={`px-3 py-1 rounded text-sm ${shuffle ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  SHUFFLE
                </button>
                <button
                  onClick={() => setRepeat(!repeat)}
                  className={`px-3 py-1 rounded text-sm ${repeat ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  REPEAT
                </button>
                <div className="flex items-center space-x-2">
                  <FaVolumeUp className="text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
                {playlist[currentTrack]?.type === 'video' && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className={`px-3 py-1 rounded text-sm ${showVideo ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    📹 VIDEO
                  </button>
                )}
              </div>
            </div>

            {/* Video Display */}
            {showVideo && playlist[currentTrack]?.type === 'video' && (
              <div className="bg-gray-800 border-t border-gray-600">
                <div className="bg-gray-700 px-3 py-1 flex items-center justify-between">
                  <span className="text-white font-bold text-sm">WINAMP VIDEO</span>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="px-2 py-1 bg-gray-600 text-white text-xs rounded"
                  >
                    CLOSE
                  </button>
                </div>
                <div className="p-4">
                  <div className="bg-black rounded overflow-hidden">
                    <video
                      ref={videoRef}
                      src={playlist[currentTrack]?.videoSrc}
                      className="w-full h-64 object-cover"
                      controls
                      autoPlay={isPlaying}
                      muted={false}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={handleNext}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-white text-sm font-semibold">
                      {playlist[currentTrack]?.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {playlist[currentTrack]?.artist}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Equalizer */}
            <div className="bg-gray-800 border-t border-gray-600">
              <div className="bg-gray-700 px-3 py-1 flex items-center justify-between">
                <span className="text-white font-bold text-sm">WINAMP EQUALIZER</span>
                <button
                  onClick={() => setEqualizerOn(!equalizerOn)}
                  className={`px-2 py-1 rounded text-xs ${equalizerOn ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                >
                  {equalizerOn ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-center space-x-2">
                  <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">AUTO</button>
                  <span className="text-white text-xs">PREAMP</span>
                  <div className="w-8 h-20 bg-gray-700 rounded relative">
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      defaultValue="0"
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-90 w-20 h-8"
                      style={{ writingMode: 'bt-lr' }}
                    />
                  </div>
                  {eqFrequencies.map((freq, index) => (
                    <div key={index} className="flex flex-col items-center space-y-1">
                      <div className="text-white text-xs">{freq}</div>
                      <div className="w-4 h-20 bg-gray-700 rounded relative">
                        <input
                          type="range"
                          min="-20"
                          max="20"
                          value={eqBands[index]}
                          onChange={(e) => handleEqBandChange(index, e.target.value)}
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-90 w-20 h-4"
                          style={{ writingMode: 'bt-lr' }}
                        />
                      </div>
                    </div>
                  ))}
                  <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">PRESETS</button>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="bg-gray-800 border-t border-gray-600">
              <div className="bg-gray-700 px-3 py-1 flex items-center justify-between">
                <span className="text-white font-bold text-sm">WINAMP PLAYLIST</span>
                <button
                  onClick={() => setPlaylistVisible(!playlistVisible)}
                  className="px-2 py-1 bg-gray-600 text-white text-xs rounded"
                >
                  {playlistVisible ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {playlistVisible && (
                <div className="p-4">
                  <div className="bg-black rounded p-2 max-h-48 overflow-y-auto">
                    {playlist.map((track, index) => (
                      <div
                        key={track.id}
                        onClick={() => handleTrackSelect(index)}
                        className={`flex justify-between items-center py-1 px-2 cursor-pointer hover:bg-gray-800 ${
                          index === currentTrack ? 'text-green-400 bg-gray-800' : 'text-white'
                        }`}
                      >
                        <span className="text-sm flex items-center">
                          {index + 1}. {track.title}
                          {track.type === 'video' && (
                            <span className="ml-2 text-orange-400 text-xs">📹</span>
                          )}
                        </span>
                        <span className="text-xs text-gray-400">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span>{currentTrack + 1}/{playlist.length}</span>
                    <span>{formatTime(currentTime)} / {formatTime(getTotalDuration())}</span>
                  </div>
                  <div className="flex justify-center space-x-2 mt-2">
                    <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">ADD</button>
                    <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">REM</button>
                    <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">SEL</button>
                    <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded">MISC</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Winamp Logo */}
          <div className="text-center mt-8">
            <div className="inline-block">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded transform rotate-45 mr-2"></div>
                <div className="w-8 h-8 bg-white border-2 border-black rounded transform rotate-45"></div>
              </div>
              <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: 'monospace' }}>
                WINAMP
                <span className="text-xs align-top">®</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                "It really whips the llama's ass!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
