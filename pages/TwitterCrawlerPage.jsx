import React, { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_API

export const TwitterCrawlerPage = () => {
  const [formData, setFormData] = useState({
    url: '',
    nombre: '',
    numero: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API + "/twitter-crawler", formData);
      if (response.status === 200) {
        setMensaje('Información enviada con éxito');
        setFormData({ url: '', nombre: '', numero: '' });
      }
    } catch (error) {
      console.error('Hubo un error al enviar los datos', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div><h1>app de twitter scraping</h1></div>
      <div style={{ marginBottom: '10px', color: "blue" }}>
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: '10px',  color: "blue"}}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: '10px', color: "blue" }}>
        <label>Número:</label>
        <input
          type="number"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};


