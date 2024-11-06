import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Button,
} from "@mui/material";
import styles from "./api-list.module.scss";
import NavBar from "../Commons/NavBar";
import config from "../../src/config.js";
import { authContext } from "../Auth/AuthContext.js";

function APIList() {
  const { token } = useContext(authContext);

  const [apis, setApis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userApis = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await fetch(`${config.apiUrl}/api/get-apis/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setApis(data);
        } else {
          alert("Error loading APIs");
        }
      } catch (error) {
        console.error("Error loading APIs:", error);
        alert("Error loading APIs");
      }
    };
    userApis();
  }, []);

  return (
    <Container maxWidth="md" className={styles.apiContainer}>
      <NavBar />
      <Typography sx={{ m: 0 }} variant="h4" align="center" gutterBottom>
        Mis APIs
      </Typography>

      {apis.length === 0 ? (
        <Typography sx={{ mt: 5 }} variant="body1" align="center" gutterBottom>
          No tienes ninguna API. ¡Crea una nueva!
        </Typography>
      ) : (
        <List>
          {apis.map((item) => (
            <ListItem className={styles.apiItem} key={item.api.id} button>
              <ListItemText
                primary={item.api.nombre}
                secondary={item.api.description}
              />
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                color="secondary"
                className={styles.buttonApi}
              >
                Ver API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                color="secondary"
                className={styles.buttonApi}
              >
                Copiar API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                color="secondary"
                className={styles.buttonApi}
              >
                Editar API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                color="secondary"
                className={styles.buttonApi}
              >
                Borrar API
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Button
        className={styles.buttonCreate}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate("/home/create-api")}
        sx={{ mt: 2 }}
      >
        Crear nueva API
      </Button>
    </Container>
  );
}

export default APIList;
