import React from 'react';
import { Button, Typography, AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import Alert from '@mui/lab/Alert';
import hyfiLogo from '../images/hyfi_logo.png';
import dearbornLogo from '../images/Dearborn_Logo.png';
import miNextCitiesLogo from '../images/Smart-City-5.webp';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#2E2E2E', // Mapbox dark mode background color
  color: '#E6E6E6',          // Mapbox dark mode text color
  marginBottom: theme.spacing(2),
}));

const HeaderTypography = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center',
  color: '#E6E6E6',          // Mapbox dark mode text color
});

function Header() {
  return (
<StyledAppBar position="static" elevation={0} style={{ paddingTop: '20px' }}> {/* Added top padding for more space */}
    <Toolbar>
        {/* Grouping Typography and Alert together */}
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center">
            <HeaderTypography variant="h3" style={{ fontWeight: 'bold' }}>Dearborn FloodWatch</HeaderTypography> {/* Changed title & increased size */}
            <HeaderTypography variant="h6" style={{ marginTop: '10px' }}>Stay Safe. Stay Informed.</HeaderTypography> {/* Added this line for the subtitle */}
            <HeaderTypography variant="h6" style={{ marginTop: '5px' }}>Real-time Road Flooding Updates.</HeaderTypography> {/* Moved this line below the subtitle */}
            {/* Uncomment the Alert section if you want to use it later */}
            {/* <Alert variant="filled" severity="success" style={{ marginTop: 10, backgroundColor: '#466370', color: '#E6E6E6' }}>
                No flooding currently detected.
            </Alert> */}
            {/* <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'row', gap: '20px', zIndex:99 }}>
            <a href="https://hyfi.io" target="_blank" rel="noopener noreferrer">
              <img src={hyfiLogo} alt="HyFi Logo" style={{ width: '100px', cursor: 'pointer' }} />
            </a>
            <a href="URL_2_HERE" target="_blank" rel="noopener noreferrer">
                <img src={dearbornLogo} alt="Dearborn Logo" style={{ width: '100px', cursor: 'pointer' }} />
            </a>
            <a href="URL_2_HERE" target="_blank" rel="noopener noreferrer">
                <img src={miNextCitiesLogo} alt="Dearborn Logo" style={{ width: '100px', cursor: 'pointer' }} />
            </a>
          </div> */}
        </Box>

        <Box sx={{ ml: 2 }}>
            <Button style={{ color: '#A8A8A8' }}>Button1</Button> {/* Slightly dimmed text for buttons */}
        </Box>
        <Box sx={{ ml: 2 }}>
            <Button style={{ color: '#A8A8A8' }}>Button2</Button> {/* Slightly dimmed text for buttons */}
        </Box>
    </Toolbar>
</StyledAppBar>
  );
}

export default Header;







