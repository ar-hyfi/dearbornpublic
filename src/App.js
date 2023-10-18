import React, { useState, useEffect } from 'react';

import './App.css';
import Map from './components/Map';
import SideBar from './components/SideBar';
import Header from './components/Header';
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
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
      Promise.all([
          fetch('/static/media/river_bridges.073ce61ee13e34f202dd.geojson').then(response => response.json()),
          fetch('/static/media/road_sensors.1f5c7a1e3f754e92f2dd.geojson').then(response => response.json())
      ]).then(([data1, data2]) => {
          const combinedFeatures = [...data1.features, ...data2.features];
          // Assuming that the two GeoJSONs have the same structure except for the features
          const mergedData = { ...data1, features: combinedFeatures };
          setGeoData(mergedData);
      }).catch(error => {
          console.error("There was an error fetching and merging the geoJSON data:", error);
      });

  }, []);

  return (
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
            {/* Assuming geoData is defined and available */}
            {geoData && <SideBar geojsonData={geoData} />}
          </Grid>
        </Grid>
      </main>
    </div>
    
    </ThemeProvider>
  );
}


export default App;
          // <Grid item xs={4}>
            {/* {geoData && <SideBar geojsonData={geoData} />} */}
          // </Grid>