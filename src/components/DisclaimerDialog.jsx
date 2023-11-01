import React, { useContext } from 'react';
import {
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Button
} from '@mui/material';
import { ThemeContext } from '../ThemeContext';

export default function DisclaimerDialog({ open, handleClose }) {
    const { currentThemeStyles } = useContext(ThemeContext);
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="disclaimer-dialog-title"
            PaperProps={{
                style: {
                    backgroundColor: currentThemeStyles.backgroundColor,
                    color: currentThemeStyles.textColor
                }
            }}
        >
            <DialogTitle id="disclaimer-dialog-title" sx={{ color: currentThemeStyles.textColor }}>Disclaimer</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: currentThemeStyles.textColor }}>
                    The information herein is for general guidance only. Exercise independent judgment when using this data. No warranties, express or implied, are provided. The provider is not liable for any resulting damages or losses.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: currentThemeStyles.textColor }}>
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
}