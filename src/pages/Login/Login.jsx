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
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import Lottie from "lottie-react";
import backgroundImage from "../../assets/background/background.jpg";
import peopleAnimation from "../../assets/animations/People.json";
import logoImage from "../../assets/logo/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsLogIn(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      console.error(error);
    } finally {
      setIsLogIn(false);
    }
  };

  const handleSetDemoAccount = () => {
    setEmail("demo@email.com");
    setPassword("password");
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          sx={{
            maxWidth: { xs: "none", sm: "100%" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: {
              xs: "center",
              sm: "center",
            },
            alignItems: "flex-start",
            height: "100vh",
            pt: {
              xs: 6,
              sm: "20vh",
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

              <Alert sx={{ mb: 2 }}>
                <Typography color="black">
                  Here to demo the app?{" "}
                  <Link
                    onClick={handleSetDemoAccount}
                    sx={{ cursor: "pointer", color: "#0da82d" }}
                  >
                    Use this account
                  </Link>
                </Typography>
              </Alert>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

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
                {isLogIn ? (
                  <>
                    Logging In...
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
                  "LOGIN"
                )}
              </Button>

              <Typography variant="body2" align="center">
                Don’t have an account?
                <Link component={RouterLink} to="/signup">
                  Sign Up
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
              paddingTop: { xs: "none", md: "30px" },
            }}
          >
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

export default Login;
