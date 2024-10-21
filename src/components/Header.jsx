// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import config from '../config/config';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import LanguageSwitcher from './LanguageSwitcher';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const { i18n } = useTranslation();
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}${config.API_ENDPOINTS.GET_HEADER}`);
        setHeaderData(response.data);
      } catch (err) {
        console.error('Error fetching header data:', err);
        setError(err.response?.data?.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const { logo, nav } = headerData.header;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #ffffff, #f0f0f0)', // Light gradient background
        boxShadow: 'none',
        height: '70px',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Toolbar sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Display logo */}
            {logo && (
              <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', marginRight: '16px' }} // Adjust size and margin as needed
              />
            )}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            {Object.entries(nav).map(([key, value]) => (
              <Button
                key={key}
                color="primary" // Change text color to primary
                component="a" // Change href to component
                href={`/${key}`} // Use href for navigation
                sx={{
                  marginLeft: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: Change hover background for better visibility
                    borderRadius: '4px',
                  },
                }}
              >
                {value[i18n.language]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}> {/* Move LanguageSwitcher to the right */}
            <LanguageSwitcher />
          </Box>

          <IconButton
            edge="end"
            color="primary" // Change icon color to primary
            onClick={handleMenuClick}
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }} // Hide on larger screens
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {Object.entries(nav).map(([key, value]) => (
          <MenuItem key={key} onClick={handleMenuClose}>
            <Button color="primary" component="a" href={`/${key}`}> {/* Change text color to primary */}
              {value[i18n.language]}
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Header;
