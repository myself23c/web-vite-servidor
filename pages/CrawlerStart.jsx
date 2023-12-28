import React, { useState } from 'react';
import '../styles/crawlerStart.css'; 

const API = import.meta.env.VITE_BACKEND_API
console.log(API)
export function URLSubmitter() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(API + '/crawler-playwright', { // Reemplaza '/endpoint' con el endpoint correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name , url }) // Envía la URL como un objeto JSON
      });

      if (response.ok) {
        alert(`La URL "${url}" ha sido enviada y está siendo procesada.`);
      } else {
        alert('Hubo un error al enviar la URL.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <div className="url-submitter-container">
      <input        className="url-input"
        type="text"
        value={name}
        onChange={handleInputChange2}/>
      <input
         className="url-input"
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Ingresa una URL"
      />
      <button  className="url-input" onClick={handleSubmit}>Enviar</button>
    </div>
  );
}


