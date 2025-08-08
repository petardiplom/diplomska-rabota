import { useEffect, useState } from "react";
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
import {
  useAddSubservice,
  useUpdateSubservice,
} from "../hooks/apiHooks/useSubservices";
import { useStaff } from "../hooks/apiHooks/useStaff";
import Autocomplete from "../components/forms/Autocomplete";

export default function EditSubserviceModal({
  open,
  onClose,
  title = "Edit subservice",
  subservice,
  service = null,
  refetchChildren,
}) {
  const {
    mutate: editSubservice,
    isLoadingEdit,
    isErrorEdit,
    errorEdit,
  } = useUpdateSubservice();
  const {
    mutate: addSubservice,
    isLoadingAdd,
    isErrorAdd,
    errorAdd,
  } = useAddSubservice();

  const { data: staff } = useStaff();

  const [selectedStaff, setSelectedStaff] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    if (staff?.length) {
      const so = staff?.map((x) => ({
        value: x.id,
        label: x.email,
      }));
      const subserviceStaffIds = subservice?.staff?.map((x) => x.id) || [];
      const preselected = so?.filter((x) =>
        subserviceStaffIds.includes(x.value)
      );
      setStaffOptions(so);
      setSelectedStaff(preselected);
    }
  }, [staff, subservice]);

  const [formData, setFormData] = useState({
    name: subservice?.name || "",
    description: subservice?.description || "",
    price: subservice?.price || 0,
    duration: subservice?.duration || 30,
    capacity: subservice?.capacity || 1,
    staff: subservice?.staff || [],
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
    if (!formData.duration) newErrors.duration = true;
    if (!formData.capacity) newErrors.capacity = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    if (!subservice) {
      addSubservice(
        { serviceId: service.id, ...formData },
        {
          onSuccess: () => {
            refetchChildren();
            onClose();
          },
        }
      );
    } else {
      editSubservice(
        { subserviceId: subservice.id, data: formData },
        {
          onSuccess: () => {
            refetchChildren();
            onClose();
          },
        }
      );
    }
  };

  const isLoading = isLoadingEdit || isLoadingAdd;
  const error = errorEdit || errorAdd;
  const isError = isErrorEdit || isErrorAdd;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <TextField
          size="small"
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
          size="small"
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
        <TextField
          size="small"
          label="Duration"
          type="number"
          name="duration"
          fullWidth
          margin="normal"
          value={formData.duration}
          error={!!errors.duration}
          helperText={errors.duration ? "Duration is required" : ""}
          onChange={handleChange}
          required
        />
        <TextField
          size="small"
          label="Capacity"
          type="number"
          name="capacity"
          fullWidth
          margin="normal"
          value={formData.capacity}
          error={!!errors.capacity}
          helperText={errors.capacity ? "Capacity is required" : ""}
          onChange={handleChange}
          required
          slotProps={{
            htmlInput: { min: 1 },
          }}
        />
        <Autocomplete
          id="my-autocomplete"
          onChange={(_, val) => setSelectedStaff(val)}
          value={selectedStaff}
          options={staffOptions}
          size="small"
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
