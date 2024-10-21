// src/components/VideoSlider.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import config from '../config/config'; // Import the config

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [hover, setHover] = useState(false); // Hover state for showing arrows
  const [fade, setFade] = useState(false); // Fade state for video transitions

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.GET_SLIDER}`);
        const data = await response.json();
        setVideos(data); // Assuming the response is an array of video objects
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchVideos();
  }, []);

  const handleVideoEnd = () => {
    handleNextVideo();
  };

  const handleNextVideo = () => {
    setFade(true); // Trigger fade out
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length); // Move to the next video
      setFade(false); // Reset fade state after transition
    }, 500); // Match this duration to the CSS transition duration
  };

  const handlePrevVideo = () => {
    setFade(true); // Trigger fade out
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length); // Move to the previous video
      setFade(false); // Reset fade state after transition
    }, 500); // Match this duration to the CSS transition duration
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw', // Full width
        overflow: 'hidden', // Hide overflow
        maxHeight: '80vh', // Optional: set max height
      }}
      onMouseEnter={() => setHover(true)} // Show arrows on hover
      onMouseLeave={() => setHover(false)} // Hide arrows when not hovering
    >
      {loading ? (
        <Typography variant="h6">Loading videos...</Typography>
      ) : (
        <>
          {videos.length > 0 ? (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Current video */}
              <video
                width="100%"
                height="auto"
                autoPlay
                muted // Auto play typically requires videos to be muted in many browsers
                onEnded={handleVideoEnd} // Trigger next video on end
                className={`video-transition fade-in`} // Apply fade-in class
                src={videos[currentVideoIndex].url} // Use 'url' from your data
              >
                Your browser does not support the video tag.
              </video>

              {/* Next video */}
              <video
                width="100%"
                height="auto"
                autoPlay
                muted
                onEnded={handleVideoEnd} // Trigger next video on end
                className={`video-transition ${fade ? 'fade-out' : 'fade-in'}`} // Apply fade classes
                src={videos[(currentVideoIndex + 1) % videos.length]?.url} // Use the next video URL
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  visibility: fade ? 'visible' : 'hidden', // Control visibility based on fade state
                  transition: 'visibility 0s 0.5s, opacity 0.5s linear', // Delay visibility change to match fade out
                  opacity: fade ? 0 : 1, // Control opacity for fade out
                }}
              >
                Your browser does not support the video tag.
              </video>

              {hover && ( // Show arrows on hover
                <>
                  <IconButton
                    onClick={handlePrevVideo}
                    sx={{
                      position: 'absolute',
                      left: '10px',
                      top: '30%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextVideo}
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '30%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ) : (
            <Typography variant="h6">No videos available.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default VideoSlider;
