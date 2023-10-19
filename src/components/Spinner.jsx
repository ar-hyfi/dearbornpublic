import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function Spinner() {
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
            backgroundColor: '#3C3C3C',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #E6E6E6',
        }}>
            <CircularProgress color="primary" />
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                Data Loading...
            </Typography>
        </div>
    );
}

export default Spinner;
