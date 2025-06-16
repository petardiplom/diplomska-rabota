import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { useAddCenter } from '../hooks/apiHooks/useCenters';

export default function AddCenterModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
  });

  const { mutate, isLoading, isError, error } = useAddCenter();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Center</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="City"
          name="city"
          fullWidth
          margin="normal"
          value={formData.city}
          onChange={handleChange}
        />
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.response?.data?.message || error.message || 'An error occurred'}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading} variant="contained" color="primary">
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
