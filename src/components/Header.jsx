import React, { useContext } from 'react';
import { Typography, AppBar, Toolbar, Box, Link, Hidden, useTheme, useMediaQuery } from '@mui/material';
// import hyfiLogo from '/Users/arielroy/dearbornpublic/src/components/Dearborn_Logo.png';
// import dearbornLogo from './dearborn_logo.png';
// import miNextCitiesLogo from './mi_next_cities_logo.png';
import { ThemeContext } from '../ThemeContext';

function Header() {
  const theme = useTheme();
  const { currentThemeStyles } = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: currentThemeStyles.backgroundColor,
        color: currentThemeStyles.textColor,
        marginBottom: theme.spacing(2),
        paddingTop: '20px', 
        paddingBottom: '20px', 
        paddingLeft: '30px', 
        paddingRight: '30px'
      }}
    >
      <Toolbar disableGutters>
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="flex-start">
          <Typography 
            variant={isMobile ? "h5" : "h3"}
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              color: currentThemeStyles.textColor
            }}
          >
            Dearborn FloodWatch
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{
              color: currentThemeStyles.textColor
            }}
          >
            Real-time road flooding updates from Hyfi
          </Typography>
        </Box>
        <Hidden smDown>
          <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
            {/* <Link href="https://hyfi.io" target="_blank" rel="noopener noreferrer">
              <img src={hyfiLogo} alt="HyFi Logo" style={{ width: '80px' }} />
            </Link>
            <Link href="https://cityofdearborn.org/government/departments/public-works" target="_blank" rel="noopener noreferrer">
              <img src={dearbornLogo} alt="Dearborn Logo" style={{ width: '80px' }} />
            </Link>
            <Link href="https://minextcities.org/" target="_blank" rel="noopener noreferrer">
              <img src={miNextCitiesLogo} alt="MI Next Cities Logo" style={{ width: '80px' }} />
            </Link> */}
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Header;







