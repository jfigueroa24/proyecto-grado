import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {TextField, Button, Container,Typography} from '@mui/material'


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/register/`,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, email, password})
      })
      
      const data = await response.json()
      if(response.ok){
        alert("Account successfully created - Login.");
        navigate('/login');
      }else{
        alert(data.error || 'Error creating user')
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Mock API</Typography>
        <form onSubmit={handleRegister}>
        <TextField
          label="Nombre"
          type="text"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        </form>
    </Container>
  );
}

export default Register;
