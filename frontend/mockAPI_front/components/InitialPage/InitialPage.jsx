import {Button, Container, Grid2, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import styles from './initial-page.module.scss'

function Home(){
  const navigate = useNavigate();
  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/register')
  }
  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login')
  }

  return(
    <Container maxWidth="sm" className={styles.container}>
    <Typography variant="h2" sx={{mb:0}} align="center" className={styles.title} gutterBottom>API MockAble</Typography>
    <Grid2 container spacing={2} alignItems="center" justifyContent="space-evenly" sx={{ mt: 2 }}>
        <Grid2 item xs={6}>
          <Typography variant="h5" sx={{mb:0}} align="center">
            You do not have an account yet, register
          </Typography>
          <Button
            size="large"  
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, py: 2 }}
            onClick={goToRegister}
          >
            Register
          </Button>
        </Grid2>

        <Grid2 item xs={6}>
          <Typography variant="h5" align="center">
            You already have an account, log in
          </Typography>
          <Button
            size="large"
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, py: 2 }}
            onClick={goToLogin}
          >
            Login
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Home;