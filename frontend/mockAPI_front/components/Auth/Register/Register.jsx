import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {TextField, Button, Container,Typography} from '@mui/material'
import styles from './register.module.scss'

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
    <Container maxWidth="sm" className={styles.registerContainer}>
      <Typography className={styles.titleRegister} variant="h4" align="center" gutterBottom>Register</Typography>
        <form className={styles.formRegister} onSubmit={handleRegister}>
        <TextField
          className={styles.TextField}
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          className={styles.TextField}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          className={styles.TextField}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          className={styles.Button}
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
