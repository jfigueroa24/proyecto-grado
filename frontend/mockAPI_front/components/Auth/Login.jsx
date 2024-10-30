import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {TextField, Button, Container,Typography} from '@mui/material'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login/`,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
      if(response.ok){
        localStorage.setItem('token',data.token)
        alert(data.mensaje);
        navigate('/get-apis/');
      }else{
        alert(data.error || 'Error al iniciar sesion')
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      alert('Error en la solicitud de login');    }
  };

  return (
    <Container>
      <Typography>
        <form onSubmit={handleLogin}>
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
          Login
        </Button>
        </form>
      </Typography>
    </Container>
  );
}

export default Login;
