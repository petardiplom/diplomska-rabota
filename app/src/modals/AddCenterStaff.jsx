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
import { isEmailValid } from "../utils/stringUtils";
import SelectOption from "../components/forms/SelectOption";
import { useAddCenterStaff } from "../hooks/apiHooks/useStaff";

const AddStaffModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const { mutate, isLoading, isError, error } = useAddCenterStaff();

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = "Email required";
    } else if (!isEmailValid(email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.username.trim()) newErrors.username = "Username required";
    if (!formData.firstname.trim()) newErrors.firstname = "Firstname required";
    if (!formData.lastname.trim()) newErrors.lastname = "Lastname required";
    if (!formData.role.trim()) newErrors.role = "Role required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add staff</DialogTitle>
      <DialogContent dividers>
        <TextField
          size="small"
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
          size="small"
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          error={!!errors.username}
          helperText={errors.username ? errors.username : ""}
          onChange={handleChange}
          placeholder="Petar123"
          required
        />
        <TextField
          size="small"
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
          size="small"
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
        <SelectOption
          label="Role"
          name="role"
          margin="normal"
          value={formData.role}
          error={!!errors.role}
          helperText={errors.role ? errors.role : ""}
          onChange={handleChange}
          options={[
            { value: "manager", label: "Manager" },
            { value: "staff", label: "Staff" },
          ]}
          fullWidth
          required
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

export default AddStaffModal;
