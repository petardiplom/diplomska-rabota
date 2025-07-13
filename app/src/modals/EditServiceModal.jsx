import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import ColorPicker from '../components/ColorPicker';
import { useUpdateService } from '../hooks/apiHooks/useServices';

export default function EditServiceModal({ open, onClose, service }) {

    const { mutate, isLoading, isError, error } = useUpdateService();

    const [formData, setFormData] = useState({
        name: service.name,
        description: service.description,
        color: service.color,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleColor = (color) => {
        setFormData(prev => ({ ...prev, color }));
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = true;
        if (!formData.description.trim()) newErrors.description = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }
        mutate({ serviceId: service.id, data: formData }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit service</DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    error={!!errors.name}
                    helperText={errors.name ? 'Name is required' : ''}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    value={formData.description}
                    error={!!errors.description}
                    helperText={errors.description ? 'Description is required' : ''}
                    onChange={handleChange}
                    required
                />
                <ColorPicker onChange={handleColor} value={formData.color} />
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
