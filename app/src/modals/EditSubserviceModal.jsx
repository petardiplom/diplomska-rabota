import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import PricePicker from "../components/PricePicker";
import { useUpdateSubservice } from "../hooks/apiHooks/useSubservices";

export default function EditSubserviceModal({
  open,
  onClose,
  subservice,
  refetchChildren,
}) {
  const { mutate, isLoading, isError, error } = useUpdateSubservice();

  const [formData, setFormData] = useState({
    name: subservice.name,
    description: subservice.description,
    price: subservice.price,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePrice = (val) => {
    setFormData((prev) => ({ ...prev, price: val }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.price) newErrors.price = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    mutate(
      { subserviceId: subservice.id, data: formData },
      {
        onSuccess: () => {
          refetchChildren();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit subservice</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          error={!!errors.name}
          helperText={errors.name ? "Name is required" : ""}
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
          helperText={errors.description ? "Description is required" : ""}
          onChange={handleChange}
          required
        />
        <PricePicker
          value={formData.price}
          onChange={handlePrice}
          required={true}
          error={!!errors.price}
          helperText={errors.price ? "Price is required" : ""}
        />
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.response?.data?.message ||
              error.message ||
              "An error occurred"}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="contained"
          color="primary"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
