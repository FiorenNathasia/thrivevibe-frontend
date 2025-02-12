import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProtectedRoute.scss";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    }
  }, [token]);

  if (!token && !redirect) {
    return (
      <div className="protectedroute__position">
        <p className="protectedroute__message">
          You are not authorised! <br />
          <span>You will be taken to login page...</span>
        </p>
      </div>
    );
  }
  if (redirect) {
    return navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
