import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./state/UserContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userData } = useUserContext();
  return userData.isSignedIn ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
