import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (user.displayName !== displayName) {
        await updateProfile(user, { displayName });
        toast.success("Name updated");
      }

      if (user.email !== email) {
        await updateEmail(user, email);
        toast.success("Email updated");
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
        toast.success("Password updated");
        setNewPassword("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField
            label="Display Name"
            fullWidth
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="New Password"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText="Leave blank to keep current password"
          />

          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
