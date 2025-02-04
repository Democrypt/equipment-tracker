import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/Register";
import Breakdown from "./pages/Breakdown";
import Maintenance from "./pages/Maintenance";



const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is always visible */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Administrator", "Engineer"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipment"
          element={
            <ProtectedRoute allowedRoles={["Administrator", "Engineer", "Observer"]}>
              <Equipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/breakdowns"
          element={
            <ProtectedRoute allowedRoles={["Administrator", "Engineer"]}>
              <Breakdown />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance" 
          element={
            <ProtectedRoute allowedRoles={["Administrator", "Engineer"]}>
              <Maintenance />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
