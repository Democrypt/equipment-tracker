import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Equipment Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/equipment">
          Equipment
        </Button>
        
        {/* Show Dashboard for Admins & Engineers */}
        {role === "Administrator" || role === "Engineer" ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/breakdowns">
              Breakdowns
            </Button>
            <Button color="inherit" component={Link} to="/maintenance">
              Maintenance
            </Button>
          </>
        ) : null}

        {/* Show Register for Unauthenticated Users */}
        {!token && (
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        )}

        {/* Show Login/Logout Button */}
        {token ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
