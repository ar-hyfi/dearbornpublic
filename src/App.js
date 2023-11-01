import React, { useContext, useState } from 'react';
import { CssBaseline, Grid, Hidden } from '@mui/material';
import { ThemeContext, ThemeProvider } from './ThemeContext'; 
import DisclaimerDialog from './components/DisclaimerDialog';
import Header from './components/Header';
import Map from './components/Map';
import SideBar from './components/SideBar';

import { Amplify, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const { theme, currentThemeStyles } = useContext(ThemeContext);
  console.log('theme', theme)
  console.log('currentThemeStyles', currentThemeStyles)
  const backgroundColor = currentThemeStyles.backgroundColor;

  const handleClose = () => {
    setAcceptedDisclaimer(true);
  };

  return (
    <ThemeProvider> {/* Wrap your app with ThemeProvider to provide the theme */}
      <CssBaseline />
      <div>
        <DisclaimerDialog open={!acceptedDisclaimer} handleClose={handleClose} />
        {/* Your app content, which will be displayed after the user accepts the disclaimer */}
        {acceptedDisclaimer && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <main style={{ flexGrow: 1, overflow: 'hidden', backgroundColor:backgroundColor}}>
              <Grid container spacing={0} style={{ height: '100%' }}>
                <Grid item xs={12} md={10} style={{ height: 'calc(100% - 64px)' }}>
                  <Map />
                </Grid>
                <Hidden smDown>
                  <Grid item md={2} style={{ overflowY: 'auto' }}>
                    <SideBar />
                  </Grid>
                </Hidden>
              </Grid>
            </main>
          </div>
        )}
      </div>
  </ThemeProvider>
  );
}

export default App;