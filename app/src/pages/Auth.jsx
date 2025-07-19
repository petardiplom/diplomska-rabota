import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/spinner/Spinner";

const Auth = () => {
  const [form, setForm] = useState("login"); // login | signup | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  const switchForm = (target) => () => {
    setForm(target);
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  const showMessage = (type, text) => toast[type](text);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        navigate("/centers");
      }, 400);
      navigate("/centers");
      showMessage("success", "Logged in successfully!");
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      showMessage("error", "Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage("success", "Account created!");
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  const handleForgot = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("success", "Reset link sent to your email");
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/centers", { replace: true });
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Spinner />
      </Box>
    );
  }

  if (user) {
    // Don't render anything, redirect is already handled in useEffect
    return null;
  }

  const renderLogin = () => (
    <form autoComplete="on" onSubmit={handleLogin}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        sx={{ mt: 2 }}
        type="submit"
        fullWidth
        variant="contained"
        loading={loading} // ← state boolean
      >
        Login
      </Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember me"
      />

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Link href="#" onClick={switchForm("forgot")} underline="hover">
          Forgot password?
        </Link>
        <Link href="#" onClick={switchForm("signup")} underline="hover">
          {`Don't have an account?`}
        </Link>
      </Stack>
    </form>
  );

  const renderSignup = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      <TextField
        fullWidth
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSignup}
      >
        Sign Up
      </Button>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Link href="#" onClick={switchForm("login")} underline="hover">
          Already have an account?
        </Link>
      </Stack>
    </>
  );

  const renderForgot = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>

      <TextField
        fullWidth
        label="Email Address"
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleForgot}
      >
        Send Reset Link
      </Button>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Link href="#" onClick={switchForm("login")} underline="hover">
          Back to login
        </Link>
      </Stack>
    </>
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 10 }}>
        {form === "login" && renderLogin()}
        {form === "signup" && renderSignup()}
        {form === "forgot" && renderForgot()}
      </Paper>
    </Container>
  );
};

export default Auth;
