import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
const Centers = () => {
  const { user, logout } = useAuth();

  return (
    <>
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Welcome, {user.email}</Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
    </>
  );
};

export default Centers;