import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../Auth/Context/AuthContext.js";

const NavBar = () => {
  const { user, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/logout`
      );
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        logout();
        navigate('/login');
        alert(data.mensaje || "Cierre de sesión exitoso");
      } else {
        alert(data.mensaje || "Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en el logout:", error);
      alert("Error al cerrar sesión");
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Nombre de la API</Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Bienvenido, {user.name}
              </Typography>
              <Button
                component={RouterLink}
                to="/my-apis"
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Mis APIs
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
            >
              Iniciar sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
