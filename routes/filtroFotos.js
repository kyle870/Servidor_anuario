const express = require('express');
const router = express.Router();


router.get('/api/filtro_gallery/images', async (req, res) => {
    const { campus, year, session } = req.query;
    const filters = {};
  
    if (campus) filters.campus = campus;
    if (year) filters.year_graduacion = year;
    if (session) filters.sesion = session;
  
    console.log('Filters:', filters);
  
    try {
      const galleries = await Gallery.find(filters);
      console.log('Galleries found:', galleries);
  
      const imagePaths = galleries.flatMap(gallery =>
        gallery.fotos_graduacion.map(image => ({
          filename: image,
          url: `http://localhost:4000/${image}`
        }))
      );
  
      console.log('Image paths:', imagePaths);
  
      res.json(imagePaths);
    } catch (err) {
      console.error('Error al recuperar imágenes:', err);
      res.status(500).send({ message: 'Error al recuperar imágenes:', error: err });
    }
  });

module.exports = router;