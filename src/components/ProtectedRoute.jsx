import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setChecking(false))
      .catch(() => navigate("/")); // redirect to sign-in
  }, [navigate]);

  if (checking) return <div>Loading...</div>;
  return children;
};

export default ProtectedRoute;
