import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Vendor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/products")}>
            Products
          </Button> 
          <Button color="inherit" onClick={() => navigate("/orders")}>
            Orders
          </Button> 
          <Button color="inherit" onClick={() => navigate("/statistics")}>
            Statistics
          </Button> 
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/logout")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
