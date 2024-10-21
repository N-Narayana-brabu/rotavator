// src/App.jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import VideoSlider from './components/VideoSlider';
import "./App.css"
// Other imports...

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div>
      <Header/>
      <VideoSlider/>
      {/* Your main application content */}
    </div>
  );
};

export default App;
