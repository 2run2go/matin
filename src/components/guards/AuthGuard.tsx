import * as React from "react";
import { Navigate } from "react-router-dom";
/////
import useAuth from "../../hooks/useAuth";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {
  const { isAuthenticated } = useAuth();
  const isLogin = !!localStorage.getItem("isLogin");

  if (!isAuthenticated && !isLogin) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{isAuthenticated && children}</React.Fragment>;
}

export default AuthGuard;
