import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/admin/register/',{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, email, password})
      })
      
      const data = await response.json()
      if(response.ok){
        alert("Cuenta creada con éxito. Inicia sesión.");
      }else{
        alert(data.message)
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
      <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
