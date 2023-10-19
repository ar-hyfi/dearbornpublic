import React, { useState, useEffect } from 'react';

import './App.css';
import Map from './components/Map';
import SideBar from './components/SideBar';
import Header from './components/Header';
import DisclaimerDialog from './components/DisclaimerDialog';

//import river_bridges from './geojsons/river_bridges.geojson';
//import road_sensors from './geojsons/road_sensors.geojson';
import { Grid } from '@mui/material';
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
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={10} style={{ height: '100%' }}>
            <Map />
          </Grid>
          <Grid item xs={2} style={{ height: '100%', overflowY: 'auto' }}>
            <SideBar />
          </Grid>
        </Grid>
      </main>
    </div>
    
    </ThemeProvider>
    )}
    </div>
  );
}


export default App;
          // <Grid item xs={4}>
            {/* {geoData && <SideBar geojsonData={geoData} />} */}
          // </Grid>