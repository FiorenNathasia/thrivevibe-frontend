import {
  Container,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo/logo.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "#BFA2DB" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box textAlign="center" mb={2}>
            <Box
              component="img"
              textAlign="center"
              src={logoImage}
              alt="ThriveVibe Logo"
              sx={{
                height: { xs: 70, sm: 100 },
                marginTop: "1rem",
              }}
            />
          </Box>
          {/* Desktop: show full buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {" "}
            <Button
              component={RouterLink}
              to="/feed"
              startIcon={<FeedIcon />}
              variant={currentPath === "/feed" ? "contained" : "text"}
              sx={{
                color: currentPath === "/feed" ? "#fff" : "#5d3fd3",
                backgroundColor:
                  currentPath === "/feed" ? "#5d3fd3" : "transparent",
              }}
            >
              Feed
            </Button>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<DashboardIcon />}
              variant={currentPath === "/" ? "contained" : "text"}
              sx={{
                color: currentPath === "/" ? "#fff" : "#5d3fd3",
                backgroundColor:
                  currentPath === "/" ? "#5d3fd3" : "transparent",
              }}
            >
              Dashboard
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ color: "#5d3fd3" }}
            >
              Logout
            </Button>
          </Stack>

          {/* Mobile: show icon buttons only */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              component={RouterLink}
              to="/feed"
              sx={{
                color: currentPath === "/feed" ? "#616162" : "#5d3fd3",
              }}
            >
              <FeedIcon />
            </IconButton>{" "}
            <IconButton
              component={RouterLink}
              to="/"
              sx={{
                color: currentPath === "/" ? "#616161" : "#5d3fd3",
              }}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
              onClick={handleLogout}
              sx={{
                color: "#5d3fd3",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
