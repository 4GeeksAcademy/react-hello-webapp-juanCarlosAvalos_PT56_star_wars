// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Endpoint proxy para imágenes
app.get('/api/image/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  
  // Mapeo de tipos
  const typeMap = {
    'person': 'characters',
    'planet': 'planets',
    'vehicle': 'vehicles'
  };

  const imageUrl = `https://starwars-visualguide.com/assets/img/${typeMap[type]}/${id}.jpg`;
  
  console.log(`Solicitando imagen: ${imageUrl}`);
  
  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      console.log(`Imagen no encontrada: ${imageUrl}`);
      // Enviar imagen placeholder si no existe
      return res.redirect(`https://via.placeholder.com/300x400/1a1a1a/ffc107?text=${type}+${id}`);
    }

    const buffer = await response.buffer();
    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=86400'); // Cache por 1 día
    res.send(buffer);
    
    console.log(`Imagen enviada exitosamente: ${imageUrl}`);
  } catch (error) {
    console.error(`Error al obtener imagen: ${error.message}`);
    // Si hay error, devolver placeholder
    res.redirect(`https://via.placeholder.com/300x400/1a1a1a/ffc107?text=Error`);
  }
});

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server corriendo en http://localhost:${PORT}`);
  console.log(`📷 Endpoint de imágenes: http://localhost:${PORT}/api/image/:type/:id`);
});