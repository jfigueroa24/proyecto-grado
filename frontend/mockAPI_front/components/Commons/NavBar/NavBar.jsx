import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Auth/AuthContext.js";
import config from "../../../src/config.js";
import styles from "./navbar.module.scss"

const NavBar = () => {
  const { user, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/admin/logout`);
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        logout();
        navigate("/login");
        alert(data.mensaje || "Successfully logout");
      } else {
        alert(data.mensaje || "Error in logout");
      }
    } catch (error) {
      console.error("Error en el logout:", error);
      alert("Error al cerrar sesión");
    }
  };

  return (
    <AppBar position="fixed" className={styles.navBar}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Bienvenido, {user.name}
          </Typography>
          <Button
            component={RouterLink}
            to="/home/get-apis"
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Mis APIs
          </Button>
          
        </Box>
        <Box sx={{
            alignItems: "center",
            gap: 2,
          }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
