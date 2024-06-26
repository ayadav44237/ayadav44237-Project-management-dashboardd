import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";

function SignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const roleRef = useRef();
  const [role, setRole] = useState("project-manager");
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    roleRef.current.value = selectedRole;
    console.log(roleRef.current.value);
    setRole(selectedRole);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      let signupData = await signup(
        nameRef.current.value,
        // roleRef.current.value,
        role,
        emailRef.current.value,
        passwordRef.current.value
      );

      console.log("signupData", signupData);

      navigate("/signin");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Register Here
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              ref={roleRef}
              value={role}
              labelId="role-label"
              id="role"
              onChange={handleChange}
              defaultValue=""
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value="project-manager">Project Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="name"
            type="name"
            fullWidth
            inputRef={nameRef}
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            inputRef={passwordRef}
            required
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            inputRef={passwordConfirmRef}
            required
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account? <Link to="/signin">Log In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
export default SignUp;
