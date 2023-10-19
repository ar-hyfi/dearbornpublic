// DisclaimerDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DisclaimerDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="disclaimer-dialog-title">
      <DialogTitle id="disclaimer-dialog-title">Disclaimer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This data is only meant as a guidance. Use your best judgement. We can't guarantee anything.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}