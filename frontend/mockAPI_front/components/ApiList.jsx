import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Container, Typography, Button } from '@mui/material';
import NavBar from '../components/Commons/NavBar.jsx';

function APIList(){
  const [apis, setApis] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const userApis = async () =>{
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/login')
        return
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-apis/`,{
          headers:{Authorization: `Bearer ${token}`}
        })
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
    }
    userApis();
  },[navigate]);
  return (
    <Container maxWidth="md">
      <NavBar/>
      <Typography variant="h4" align="center" gutterBottom>Mis APIs</Typography>
      
      {apis.length === 0 ? (
        <Typography sx={{ mt: 5 }} variant="body1" align="center" gutterBottom>
          No tienes ninguna API. ¡Crea una nueva!
        </Typography>
      ) : (
        <List>
          {apis.map(item => (
            <ListItem key={item.api.id} button>
              <ListItemText primary={item.api.nombre} secondary={item.api.description} />
            </ListItem>
          ))}
        </List>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate('http://localhost:3000/api/create-api')}
        sx={{ mt: 2 }}
      >
        Crear nueva API
      </Button>
    </Container>
  )
}

export default APIList;
