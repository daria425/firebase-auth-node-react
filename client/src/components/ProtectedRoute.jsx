import { AuthContext } from "../services/AuthProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { authenticatedUser, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!authenticatedUser) {
    return <Navigate to="/403" />;
  } else return <Outlet context={{ authenticatedUser }} />;
}
