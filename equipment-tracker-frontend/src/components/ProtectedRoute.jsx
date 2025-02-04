import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Ensure parsing

  console.log("User Role from localStorage:", userRole);
  console.log("Allowed Roles:", allowedRoles);

  // Debug if user role exists in allowedRoles
  console.log("User has valid role:", allowedRoles.includes(userRole));

  if (!token) {
    console.log("Redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log("Redirecting to Unauthorized...");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
