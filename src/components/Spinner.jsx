import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';

function Spinner() {
    const { currentThemeStyles } = useContext(ThemeContext);
    const backgroundColor = currentThemeStyles.backgroundColor;
    const textOutlineColor = currentThemeStyles.mapTextOutline;
    const textColor = currentThemeStyles.textColor;

    return (
        <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #E6E6E6',
        }}>
            <CircularProgress color="secondary" />
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                Data Loading...
            </Typography>
        </div>
    );
}

export default Spinner;
