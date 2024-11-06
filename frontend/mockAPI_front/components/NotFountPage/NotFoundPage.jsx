import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" color="error" gutterBottom>
        Ruta no encontrada
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        La página que estás buscando no existe.
      </Typography>
      <Button variant="contained" color="primary" onClick={goHome} sx={{ mt: 3 }}>
        Volver a la página principal
      </Button>
    </Container>
  );
}

export default NotFound;
