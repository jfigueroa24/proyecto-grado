import { useState } from 'react';

function APIEditor({ api }) {
  const [nombre, setName] = useState(api.nombre);
  const [description, setDescription] = useState(api.description);
  const [methods, setMethods] = useState(api.methods || []);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/login/api/get-apis/${api.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, methods })
      });
      if (response.ok) {
        alert("API actualizada con éxito.");
      } else {
        alert("Error al actualizar la API.");
      }
    } catch (error) {
      console.error("Error al actualizar la API:", error);
    }
  };

  return (
    <div>
      <h2>Editar API</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <div>
        <label>Métodos Permitidos:</label>
        <select multiple value={methods} onChange={(e) => setMethods([...e.target.selectedOptions].map(o => o.value))}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <button onClick={handleSave}>Guardar Cambios</button>
    </div>
  );
}

export default APIEditor;
