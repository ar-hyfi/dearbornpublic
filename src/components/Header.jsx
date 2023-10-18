import React from 'react';
import { Button, Typography, AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import Alert from '@mui/lab/Alert';

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
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        {/* Grouping Typography and Alert together */}
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center">
          <HeaderTypography variant="h6">Current Dearborn Flooding</HeaderTypography>
          <Alert variant="filled" severity="success" style={{ marginTop: 10, backgroundColor: '#466370', color: '#E6E6E6' }}>
            No flooding currently detected.
          </Alert>
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







