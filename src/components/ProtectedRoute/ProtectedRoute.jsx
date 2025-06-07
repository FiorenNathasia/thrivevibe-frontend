import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [token]);

  if (!token) {
    return (
      <Box>
        <Typography variant="h5"> You are not authorised!</Typography>
        <Typography>You will be taken to login page...</Typography>
      </Box>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
