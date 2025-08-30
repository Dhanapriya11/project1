import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ allowedRoles, children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser.role?.toLowerCase();

  // Normalize allowedRoles into an array
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles.map(r => r.toLowerCase())
    : [allowedRoles.toLowerCase()];

  if (rolesArray.includes(userRole)) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default RouteGuard;
