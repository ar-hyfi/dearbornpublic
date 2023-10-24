// DisclaimerDialog.js
import React from 'react';
import { 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Button, 
    ThemeProvider, createTheme 
} from '@mui/material';

const darkTheme = createTheme({
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

export default function DisclaimerDialog({ open, handleClose }) {
  return (
    <ThemeProvider theme={darkTheme}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="disclaimer-dialog-title">
            <DialogTitle id="disclaimer-dialog-title">Disclaimer</DialogTitle>
            <DialogContent>
                <DialogContentText>

                The information herein is for general guidance only. Exercise independent judgment when using this data. No warranties, express or implied, are provided. The provider is not liable for any resulting damages or losses.                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    </ThemeProvider>
  );
}