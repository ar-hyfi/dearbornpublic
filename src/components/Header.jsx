import React from 'react';
import { Typography, AppBar, Toolbar, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import hyfiLogo from './hyfi_logo.png';
import dearbornLogo from './Dearborn_Logo.png';
import miNextCitiesLogo from './Smart-City-5.webp';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#2E2E2E', 
  color: '#E6E6E6',          
  marginBottom: theme.spacing(2),
}));

const HeaderTypography = styled(Typography)({
  flexGrow: 1,
  textAlign: 'left',  // Adjusted to left-align
  color: '#E6E6E6',         
});

function Header() {
  return (
    <StyledAppBar position="static" elevation={0}>
        <Toolbar style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '30px', paddingRight: '30px' }}> 
            <Box flexGrow={1} display="flex" flexDirection="column" alignItems="flex-start">  
                <HeaderTypography variant="h3">Dearborn FloodWatch</HeaderTypography>
                <HeaderTypography variant="subtitle1">Real-time road flooding updates</HeaderTypography>
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>  
                <Link href="https://hyfi.io" target="_blank" rel="noopener noreferrer">
                    <img src={hyfiLogo} alt="HyFi Logo" style={{ width: '80px' }} />
                </Link>
                <Link href="https://cityofdearborn.org/government/departments/public-works" target="_blank" rel="noopener noreferrer">
                    <img src={dearbornLogo} alt="Dearborn Logo" style={{ width: '80px' }} />
                </Link>
                <Link href="https://minextcities.org/" target="_blank" rel="noopener noreferrer">
                    <img src={miNextCitiesLogo} alt="MI Next Cities Logo" style={{ width: '80px' }} />
                </Link>
            </Box>
        </Toolbar>
    </StyledAppBar>
  );
}

export default Header;






