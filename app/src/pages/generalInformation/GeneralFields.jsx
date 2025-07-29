import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { printDateTime } from "../../utils/printUtils";
import { useUpdateCenter } from "../../hooks/apiHooks/useCenters";
import LoadingComponent from "../../components/LoadingComponent";

const GeneralFields = ({ center }) => {
  const { mutate, isLoading } = useUpdateCenter();
  const [ls, setLs] = useState({
    name: center.name || "",
    description: center.description || "",
    email: center.email || "",
    address: center.address || "",
    country: center.country || "",
    phone: center.phone || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone") {
      const allowedChars = /^[0-9+\-() ]*$/;
      if (allowedChars.test(e.target.value)) {
        setLs((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setLs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    mutate(ls);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box mt={3}>
      <TextField
        name="name"
        value={ls.name}
        onChange={handleChange}
        label="Name"
        placeholder="Skopje Fitness"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        name="description"
        value={ls.description}
        onChange={handleChange}
        label="Description"
        placeholder="Gym located in Skopje"
        sx={{ mb: 2 }}
        multiline
        minRows={3}
        fullWidth
      />
      <TextField
        name="email"
        value={ls.email}
        onChange={handleChange}
        label="Email"
        placeholder="fitness@test.com"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        name="address"
        value={ls.address}
        onChange={handleChange}
        placeholder="Macedonia St, Skopje 1000"
        label="Address"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        name="country"
        value={ls.country}
        onChange={handleChange}
        placeholder="Macedonia"
        label="Country"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        name="phone"
        type="tel"
        value={ls.phone}
        onChange={handleChange}
        placeholder="+389 70 123 456"
        label="Contact number"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        name="createdAt"
        slotProps={{
          input: {
            readOnly: true,
            disabled: true,
          },
        }}
        value={printDateTime(center?.created_at)}
        label="Created at"
        sx={{ mb: 2 }}
        fullWidth
      />
      <Box display="flex" justifyContent="end">
        <Button onClick={handleSubmit}>Update</Button>
      </Box>
    </Box>
  );
};

export default GeneralFields;
