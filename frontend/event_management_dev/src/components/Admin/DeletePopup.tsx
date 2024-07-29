import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { deleteEventById  } from '../../api/eventApi';
import { checkCredentials } from '../../api/authApi'; 

interface DeletePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (user_id: string, password: string, event_id: string) => void;
  user_id: string;
  event_id: string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ open, onClose, onConfirm, user_id, event_id }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await checkCredentials(user_id, password);
      if (response.message === 'Credentials are correct') {
        await deleteEventById(event_id);
        onConfirm(user_id, password, event_id);
        onClose();
        setPassword('');
        alert("Event deleted!")
        window.location.reload(); 
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Incorrect Credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-modal="true">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your password to confirm deletion.
        </DialogContentText>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
