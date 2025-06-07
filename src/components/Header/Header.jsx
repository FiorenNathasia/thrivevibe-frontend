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

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Box sx={{ borderBottom: 1 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography>Logo</Typography>

          {/* Desktop: show full buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Button
              component={RouterLink}
              to="/"
              startIcon={<DashboardIcon />}
              variant={currentPath === "/" ? "contained" : "text"}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/feed"
              startIcon={<FeedIcon />}
              variant={currentPath === "/feed" ? "contained" : "text"}
            >
              Feed
            </Button>
            <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>

          {/* Mobile: show icon buttons only */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              component={RouterLink}
              to="/"
              color={currentPath === "/" ? "primary" : "default"}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/feed"
              color={currentPath === "/feed" ? "primary" : "default"}
            >
              <FeedIcon />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
