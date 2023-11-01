import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';

// Dearborn, MI coordinates
const dearbornLatitude = 42.3223;
const dearbornLongitude = -83.1763;

// Create a context for the theme
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // default theme

  useEffect(() => {
    const fetchSunTimesAndSetTheme = async () => {
      try {
        const response = await axios.get(`https://api.mapbox.com/sun/v1/sunrise-sunset?coordinates=${dearbornLongitude},${dearbornLatitude}&access_token=pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA`);
        const { sunrise, sunset } = response.data;

        const sunriseDate = new Date(sunrise);
        const sunsetDate = new Date(sunset);

        const now = new Date();
        if (now >= sunriseDate && now <= sunsetDate) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      } catch (error) {
        console.error('Error fetching sun times:', error);
        setTheme('light'); // Default to 'light' theme in case of error
      }
    };

    fetchSunTimesAndSetTheme();

    // Set an interval to update the theme periodically
    const intervalId = setInterval(fetchSunTimesAndSetTheme, 1000 * 60 * 60); // every hour

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, []);

  const lightTheme = createTheme({
    mapStyle: 'mapbox://styles/mapbox/light-v10',
    mapTextOutline: 'white', // Mapbox light mode text outline color
    backgroundColor: 'white',
    textColor: '#3D3D3D',
    palette: {
      mode: 'light',
      primary: {
        main: '#333333', // A common color for primary text in Mapbox light mode
      },
      background: {
        default: '#FFFFFF', // Mapbox light mode background color
        paper: '#F3F3F3', // For elevated components in light mode
      },
      text: {
        primary: '#333333', // Mapbox light mode text color
        secondary: '#585858', // Slightly dimmed text color
      },
    },
  });

  const darkTheme = createTheme({
    mapStyle: 'mapbox://styles/mapbox/dark-v10',
    mapTextOutline: 'black', // Mapbox dark mode text outline color
    backgroundColor: '#292929',
    textColor: "#E6E6E6",
    palette: {
      mode: 'dark',
      primary: {
        main: '#E6E6E6', // A common color for primary text in Mapbox dark mode
      },
      background: {
        default: '#2E2E2E', // Mapbox dark mode background color
        paper: '#3C3C3C', // For elevated components in dark mode
      },
      text: {
        primary: '#E6E6E6', // Mapbox dark mode text color
        secondary: '#A8A8A8', // Slightly dimmed text color
      },
    },
  });

  const currentThemeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, currentThemeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };