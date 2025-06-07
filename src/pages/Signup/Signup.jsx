import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Link,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        user
      );
      navigate("/login");
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          pt: {
            xs: 6,
            sm: "25vh",
          },
        }}
      >
        <Card
          sx={{
            px: 4,
            py: 3,
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box textAlign="center" mb={2}>
              <Typography variant="h4">ThriveVibe</Typography>
              <Typography variant="subtitle1">
                Unleash Your Potential
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={!email || !password}
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );

  // return (
  //   <>
  //     {isLoading && <Loader />}
  //     <Container maxWidth="xs">
  //       <Box
  //         sx={{
  //           pt: 8,
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Typography variant="h3" mb={5}>
  //           Sign Up
  //         </Typography>

  //         {error && (
  //           <Alert
  //             severity="error"
  //             sx={{
  //               width: "100%",
  //               mt: 2,
  //               mb: 4,
  //             }}
  //           >
  //             {error}
  //           </Alert>
  //         )}

  //         <Stack direction="column" gap={2} width="100%" mt={2} mb={2}>
  //           <TextField
  //             label="First Name"
  //             variant="outlined"
  //             fullWidth
  //             value={firstName}
  //             onChange={(e) => setFirstName(e.target.value)}
  //           />

  //           <TextField
  //             label="Last Name"
  //             variant="outlined"
  //             fullWidth
  //             value={lastName}
  //             onChange={(e) => setLastName(e.target.value)}
  //           />

  //           <TextField
  //             label="Email Address"
  //             type="email"
  //             variant="outlined"
  //             fullWidth
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />

  //           <TextField
  //             label="Password"
  //             type="password"
  //             variant="outlined"
  //             fullWidth
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />

  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             onClick={handleSubmit}
  //             sx={{ py: 1.5 }}
  //             disabled={
  //               isLoading || !email || !password || !firstName || !lastName
  //             }
  //           >
  //             Sign Up
  //           </Button>
  //         </Stack>
  //         <Typography variant="body2" align="center">
  //           Already have an account?{" "}
  //           <Link component={RouterLink} to="/login">
  //             Log in
  //           </Link>
  //         </Typography>
  //       </Box>
  //     </Container>
  //   </>
  // );
}

export default Signup;
