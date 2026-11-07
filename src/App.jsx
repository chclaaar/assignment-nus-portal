import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="layout">
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
        </Routes>
      </main>
    </div>
  );
}
