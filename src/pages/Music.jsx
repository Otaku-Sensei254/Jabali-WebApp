// src/pages/Music.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useChild } from '../Components/Context/useChild';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaHeart, 
  FaRegHeart,
  FaMusic,
  FaHeadphones,
  FaSearch
} from 'react-icons/fa';
import { GiViolin, GiPianoKeys, GiHarp } from 'react-icons/gi';
import { IoMdLeaf } from 'react-icons/io';
import '../styles/music.css';

const Music = () => {
  const { selectedChild } = useChild();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedMood, setSelectedMood] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef(null);

  // Music categories and moods
  const moods = [
    { id: 'all', name: 'All Moods', icon: '🎵', color: 'var(--primary)' },
    { id: 'calm', name: 'Calm & Peaceful', icon: '😌', color: 'var(--success)' },
    { id: 'sleep', name: 'Sleep & Relax', icon: '😴', color: 'var(--info)' },
    { id: 'focus', name: 'Focus & Study', icon: '🎯', color: 'var(--warning)' },
    { id: 'happy', name: 'Happy & Playful', icon: '😊', color: 'var(--pink)' },
    { id: 'nature', name: 'Nature Sounds', icon: '🌿', color: 'var(--teal)' }
  ];

  // Soothing music tracks for children
  const musicTracks = [
    {
      id: 1,
      title: "Twinkle Twinkle Little Star",
      artist: "Lullaby Classics",
      duration: "2:45",
      mood: "sleep",
      category: "lullaby",
      audioUrl: "/audio/twinkle-twinkle.mp3",
      coverArt: "🎵",
      color: "var(--red)",
      description: "Gentle piano version of the classic lullaby",
      bpm: 60,
      instruments: ["piano", "strings"]
    },
    {
      id: 2,
      title: "Gentle Ocean Waves",
      artist: "Nature Sounds",
      duration: "15:00",
      mood: "calm",
      category: "nature",
      audioUrl: "/audio/ocean-waves.mp3",
      coverArt: "🌊",
      color: "var(--teal)",
      description: "Soothing ocean waves for relaxation",
      bpm: 50,
      instruments: ["nature"]
    },
    {
      id: 3,
      title: "Moonlight Sonata",
      artist: "Beethoven",
      duration: "5:30",
      mood: "focus",
      category: "classical",
      audioUrl: "/audio/moonlight-sonata.mp3",
      coverArt: "🌙",
      color: "var(--blue)",
      description: "Calming classical piece for concentration",
      bpm: 65,
      instruments: ["piano"]
    },
    {
      id: 4,
      title: "Forest Whisper",
      artist: "Nature Sounds",
      duration: "12:00",
      mood: "nature",
      category: "nature",
      audioUrl: "/audio/forest-whisper.mp3",
      coverArt: "🌲",
      color: "var(--green)",
      description: "Gentle forest sounds with bird songs",
      bpm: 55,
      instruments: ["nature"]
    },
    {
      id: 5,
      title: "Brahms' Lullaby",
      artist: "Classical Lullabies",
      duration: "3:15",
      mood: "sleep",
      category: "lullaby",
      audioUrl: "/audio/brahms-lullaby.mp3",
      coverArt: "🎶",
      color: "var(--yellow)",
      description: "Soothing violin and piano lullaby",
      bpm: 58,
      instruments: ["violin", "piano"]
    },
    {
      id: 6,
      title: "Celestial Harp",
      artist: "Healing Sounds",
      duration: "8:45",
      mood: "calm",
      category: "ambient",
      audioUrl: "/audio/celestial-harp.mp3",
      coverArt: "✨",
      color: "var(--purple)",
      description: "Ethereal harp music for deep relaxation",
      bpm: 62,
      instruments: ["harp", "strings"]
    },
    {
      id: 7,
      title: "Rainfall Meditation",
      artist: "Nature Sounds",
      duration: "20:00",
      mood: "calm",
      category: "nature",
      audioUrl: "/audio/rainfall.mp3",
      coverArt: "🌧️",
      color: "var(--indigo)",
      description: "Gentle rainfall for meditation and sleep",
      bpm: 48,
      instruments: ["nature"]
    },
    {
      id: 8,
      title: "Happy Little Tune",
      artist: "Children's Music",
      duration: "2:30",
      mood: "happy",
      category: "children",
      audioUrl: "/audio/happy-tune.mp3",
      coverArt: "🎪",
      color: "var(--pink)",
      description: "Playful melody for happy moments",
      bpm: 85,
      instruments: ["xylophone", "flute"]
    }
  ];

  // Filter tracks based on mood and search
  const filteredTracks = musicTracks.filter(track => {
    const moodMatch = selectedMood === 'all' || track.mood === selectedMood;
    const searchMatch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       track.description.toLowerCase().includes(searchQuery.toLowerCase());
    return moodMatch && searchMatch;
  });

  // Play/Pause functionality
  const togglePlayPause = (track = null) => {
    if (track && track !== currentTrack) {
      setCurrentTrack(track);
      setIsPlaying(true);
      // In a real app, you would set the audio source
      // audioRef.current.src = track.audioUrl;
    } else if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Toggle favorite
  const toggleFavorite = (trackId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(trackId)) {
        newFavorites.delete(trackId);
      } else {
        newFavorites.add(trackId);
      }
      return newFavorites;
    });
  };

  // Get instrument icons
  const getInstrumentIcon = (instrument) => {
    switch (instrument) {
      case 'piano': return <GiPianoKeys />;
      case 'violin': return <GiViolin />;
      case 'harp': return <GiHarp />;
      case 'nature': return <IoMdLeaf />;
      default: return <FaMusic />;
    }
  };

  // Get mood icon
  const getMoodIcon = (moodId) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.icon : '🎵';
  };

  return (
    <div className="music-container">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        volume={volume}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header Section */}
      <div className="music-header">
        <div className="header-content">
          <h1>Soothing Melodies</h1>
          {selectedChild ? (
            <p className="welcome-message">
              Hello {selectedChild.name}! Let's find some calming music for you.
            </p>
          ) : (
            <p className="welcome-message">
              Discover calming music and sounds for relaxation and focus.
            </p>
          )}
        </div>
        <div className="header-stats">
          <div className="stat">
            <FaHeadphones />
            <span>{filteredTracks.length} Tracks</span>
          </div>
          <div className="stat">
            <FaHeart />
            <span>{favorites.size} Favorites</span>
          </div>
        </div>
      </div>

      {/* Mood Filters */}
      <div className="mood-filters">
        <h2>Choose Your Mood</h2>
        <div className="mood-grid">
          {moods.map(mood => (
            <button
              key={mood.id}
              className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
              onClick={() => setSelectedMood(mood.id)}
              style={{ '--mood-color': mood.color }}
            >
              <span className="mood-icon">{mood.icon}</span>
              <span className="mood-name">{mood.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for music, artists, or sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Music Grid */}
      <div className="music-grid">
        {filteredTracks.map(track => (
          <div
            key={track.id}
            className={`music-card ${currentTrack?.id === track.id ? 'active' : ''} ${
              favorites.has(track.id) ? 'favorite' : ''
            }`}
            onClick={() => togglePlayPause(track)}
          >
            <div 
              className="cover-art"
              style={{ backgroundColor: track.color }}
            >
              <span className="cover-icon">{track.coverArt}</span>
              <div className="play-overlay">
                {currentTrack?.id === track.id && isPlaying ? (
                  <FaPause className="play-icon" />
                ) : (
                  <FaPlay className="play-icon" />
                )}
              </div>
            </div>

            <div className="track-info">
              <h3 className="track-title">{track.title}</h3>
              <p className="track-artist">{track.artist}</p>
              <p className="track-description">{track.description}</p>
              
              <div className="track-meta">
                <span className="duration">
                  <FaMusic /> {track.duration}
                </span>
                <span className="bpm">♫ {track.bpm} BPM</span>
              </div>

              <div className="track-tags">
                <span className="mood-tag">
                  {getMoodIcon(track.mood)} {moods.find(m => m.id === track.mood)?.name}
                </span>
                <div className="instruments">
                  {track.instruments.map((instrument, index) => (
                    <span key={index} className="instrument-tag">
                      {getInstrumentIcon(instrument)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="favorite-btn"
              onClick={(e) => toggleFavorite(track.id, e)}
              title={favorites.has(track.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {favorites.has(track.id) ? (
                <FaHeart className="favorite-icon" />
              ) : (
                <FaRegHeart className="favorite-icon" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="now-playing-bar">
          <div className="now-playing-content">
            <div className="track-display">
              <div 
                className="current-cover"
                style={{ backgroundColor: currentTrack.color }}
              >
                {currentTrack.coverArt}
              </div>
              <div className="track-details">
                <h4 className="current-title">{currentTrack.title}</h4>
                <p className="current-artist">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="player-controls">
              <button
                className="control-btn"
                onClick={() => togglePlayPause()}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>

            <div className="volume-controls">
              <button
                className="volume-btn"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>

            <div className="progress-section">
              <span className="current-time">0:00</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              <span className="total-time">{currentTrack.duration}</span>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredTracks.length === 0 && (
        <div className="no-results">
          <FaMusic className="no-results-icon" />
          <h3>No music found</h3>
          <p>Try adjusting your search or mood filter</p>
        </div>
      )}

      {/* Quick Play Sections */}
      <div className="quick-sections">
        <div className="section">
          <h3>🌙 Bedtime Lullabies</h3>
          <div className="quick-tracks">
            {musicTracks
              .filter(track => track.mood === 'sleep')
              .slice(0, 3)
              .map(track => (
                <div
                  key={track.id}
                  className="quick-track"
                  onClick={() => togglePlayPause(track)}
                >
                  <span className="quick-cover" style={{ backgroundColor: track.color }}>
                    {track.coverArt}
                  </span>
                  <div className="quick-info">
                    <span className="quick-title">{track.title}</span>
                    <span className="quick-artist">{track.artist}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="section">
          <h3>🎯 Focus & Study</h3>
          <div className="quick-tracks">
            {musicTracks
              .filter(track => track.mood === 'focus')
              .slice(0, 3)
              .map(track => (
                <div
                  key={track.id}
                  className="quick-track"
                  onClick={() => togglePlayPause(track)}
                >
                  <span className="quick-cover" style={{ backgroundColor: track.color }}>
                    {track.coverArt}
                  </span>
                  <div className="quick-info">
                    <span className="quick-title">{track.title}</span>
                    <span className="quick-artist">{track.artist}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;