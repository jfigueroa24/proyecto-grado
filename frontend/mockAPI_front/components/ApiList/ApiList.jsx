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
  const { token, user } = useContext(authContext);

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
        } else if (apis.length === 0){
          return
        }else{
          alert("Error loading APIs");
          navigate("/login")
        }
      } catch (error) {
        console.error("Error loading APIs:", error);
        alert("Error loading APIs");
      }
    };
    userApis();
  }, [apis]);

  const handleShowResponses = async (index) =>{
    const res = await fetch(`${config.apiUrl}/api/get-api/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { api } = await res.json();

    const url = `${config.apiUrl}/public/${user.base_path}/${api[0].nombre}/`;
    window.open(url, '_blank')
  }

  const handleDelete = async (index) =>{
    if (!token) {
      return;
    }
    try {
      const deleteAPI = confirm("Do you want delete this API?");
      if(!deleteAPI) return;

      const response = await fetch(`${config.apiUrl}/api/delete-api/${index}`, {
        method:"DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message)
        setApis((prevApis) => prevApis.filter((api) => api.indice !== index));
      } else if (data.length === 0){
        return
      }else{
        alert("Error deleting APIs");
      }
    } catch (error) {
      console.error("Error deleting APIs:", error);
      alert("Error deleting APIs");
    }
  }

  return (
    <Container maxWidth="md" className={styles.apiContainer}>
      <NavBar />
      <Typography sx={{ m: 0,fontWeight:"bold" }} variant="h4" align="center" gutterBottom>
        My APIs
      </Typography>

      {apis.length === 0 ? (
        <Typography sx={{ m: 2 }} variant="body1" align="center" gutterBottom>
          You do not have an API, create a new one!
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
                onClick={() => navigate(`/home/get-api/${item.api.id}/responses`)}
              >
                Show API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                className={styles.buttonApi}
                onClick={() => handleShowResponses(item.api.id)}
              >
                Copy API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                className={styles.buttonApi}
                onClick={() => navigate(`/home/edit-api/${item.api.id}`)}
              >
                Edit API
              </Button>
              <Button
                sx={{ m: 2, color: "#3c5969" }}
                variant="text"
                className={styles.buttonApi}
                onClick={() => handleDelete(item.api.id)}
              >
                Delete API
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
      Create a new api
      </Button>
    </Container>
  );
}

export default APIList;
