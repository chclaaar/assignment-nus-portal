import { Navigate, useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <p className="loading">Checking your login…</p>;

  if (!user) {
    // Send them to login, and remember which page they wanted
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
