import React, { useState, useEffect } from 'react';

import './App.css';
import Map from './components/Map';
import SideBar from './components/SideBar';
import Header from './components/Header';
import DisclaimerDialog from './components/DisclaimerDialog';

//import river_bridges from './geojsons/river_bridges.geojson';
//import road_sensors from './geojsons/road_sensors.geojson';
import { Grid, Hidden } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
      mode: 'dark',
      background: {
          default: '#2E2E2E', // Adjust this color as necessary.
      },
  },
});

function App() {
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  const handleClose = () => {
    setAcceptedDisclaimer(true);
  };

  return (

<div>
    <DisclaimerDialog open={!acceptedDisclaimer} handleClose={handleClose} />
    {/* Your app content, which will be displayed after the user accepts the disclaimer */}
    {acceptedDisclaimer && (
    <ThemeProvider theme={globalTheme}>
    <CssBaseline />
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid container spacing={0} style={{ height: '100%' }}>
          {/* The Map component will take the full width on small screens (xs) and medium or above */}
          <Grid item xs={12} md={10} style={{ height: 'calc(100% - 64px)' }}> {/* Assuming header height is 64px */}
            <Map />
          </Grid>
          {/* The SideBar will be hidden on small screens (xs) */}
          <Hidden smDown>
            <Grid item md={2} style={{ overflowY: 'auto' }}>
              <SideBar />
            </Grid>
          </Hidden>
        </Grid>
      </main>
    </div>
    </ThemeProvider>
    )}
</div>
  );
}

export default App;