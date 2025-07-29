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
import { useUpdateCustomer } from "../hooks/apiHooks/useCustomers";
import { isEmailValid } from "../utils/stringUtils";

const EditCustomerModal = ({ open, onClose, customer }) => {
  const [formData, setFormData] = useState({
    email: customer.email || "",
    firstname: customer.firstname || "",
    lastname: customer.lastname || "",
    phone: customer.phone || "",
  });
  const [errors, setErrors] = useState({});

  const { mutate, isLoading, isError, error } = useUpdateCustomer();

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = "Email required";
    } else if (!isEmailValid(email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.firstname.trim()) newErrors.firstname = "Firstname required";
    if (!formData.lastname.trim()) newErrors.lastname = "Lastname required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const allowedChars = /^[0-9+\-() ]*$/;
      if (allowedChars.test(e.target.value)) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    mutate(
      { customerId: customer.id, data: formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit customer</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          error={!!errors.email}
          helperText={errors.email ? errors.email : ""}
          onChange={handleChange}
          placeholder="email@test.com"
          required
        />
        <TextField
          label="Firstname"
          name="firstname"
          fullWidth
          margin="normal"
          value={formData.firstname}
          error={!!errors.firstname}
          helperText={errors.firstname ? errors.firstname : ""}
          onChange={handleChange}
          placeholder="Petar"
          required
        />
        <TextField
          label="Lastname"
          name="lastname"
          fullWidth
          margin="normal"
          value={formData.lastname}
          error={!!errors.lastname}
          helperText={errors.lastname ? errors.lastname : ""}
          onChange={handleChange}
          placeholder="Petarovski"
          required
        />
        <TextField
          label="Phone"
          type="tel"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          placeholder="+389 70 123 456"
          onChange={handleChange}
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
};

export default EditCustomerModal;
