import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Admission from "./pages/Admission";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="layout">
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/academics"
            element={<ProtectedRoute><Academics /></ProtectedRoute>}
          />
          <Route
            path="/admission"
            element={<ProtectedRoute><Admission /></ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
