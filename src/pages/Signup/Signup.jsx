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
import Lottie from "lottie-react";
import backgroundImage from "../../assets/background/background.jpg";
import peopleAnimation from "../../assets/animations/People.json";
import logoImage from "../../assets/logo/logo.png";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      setIsSignUp(true);
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
    setIsSignUp(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, // Change to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          sx={{
            maxWidth: { xs: "none", sm: "100%" },
            flexDirection: { xs: "column", sm: "row" },
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
            },
            alignItems: "flex-start",
            height: "100vh",
            pt: {
              xs: 6,
              sm: "16vh",
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
                <Box
                  component="img"
                  textAlign="center"
                  src={logoImage}
                  alt="ThriveVibe Logo"
                  sx={{
                    maxWidth: 180,
                    height: "auto",
                  }}
                />
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
                sx={{ mt: 2, mb: 1, backgroundColor: "#5D3FD3" }}
              >
                {isSignUp ? (
                  <>
                    Signing up...
                    <CircularProgress
                      size={20}
                      sx={{
                        color: "#FFB677",
                        position: "absolute",
                        right: 16,
                      }}
                    />
                  </>
                ) : (
                  "SIGN UP"
                )}
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link component={RouterLink} to="/login">
                  Log in
                </Link>
              </Typography>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              maxWidth: 900,
              justifyContent: { xs: "none", md: "right" },
              paddingLeft: { xs: "none", md: "40px" },
              paddingTop: { xs: "none", md: "60px" },
            }}
          >
            {" "}
            <Lottie
              loop={true}
              animationData={peopleAnimation}
              style={{ width: 1000 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Signup;
