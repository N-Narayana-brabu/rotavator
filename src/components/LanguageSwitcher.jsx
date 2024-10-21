// src/components/LanguageSwitcher.jsx
import React from 'react';
import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Store the selected language in local storage
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      <Button
        onClick={() => changeLanguage('en')}
        sx={{
          marginLeft: 1,
          borderRadius: '10px', // Rounded edges
          backgroundColor: '#e0f7fa', // Light background
          color: '#00796b', // Text color
          padding: '8px 16px', // Padding for button
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
          '&:hover': {
            backgroundColor: '#b2ebf2', // Lighter background on hover
            transform: 'scale(1.05)', // Slightly enlarge on hover
          },
        }}
      >
        English
      </Button>
      <Button
        onClick={() => changeLanguage('ta')}
        sx={{
          marginLeft: 1,
          borderRadius: '10px', // Rounded edges
          backgroundColor: '#e0f7fa', // Light background
          color: '#00796b', // Text color
          padding: '8px 16px', // Padding for button
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
          '&:hover': {
            backgroundColor: '#b2ebf2', // Lighter background on hover
            transform: 'scale(1.05)', // Slightly enlarge on hover
          },
        }}
      >
        தமிழ்
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
