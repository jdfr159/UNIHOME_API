const express = require('express');
const router = express.Router();
const propiedadController = require('../controllers/propiedadController');  // Asegúrate de que esta ruta sea correcta

// Ruta para crear una nueva propiedad
router.post('/crear', propiedadController.crearPropiedad);

//listar
router.get('/listar', propiedadController.listarPropiedades);

// Ruta para editar una propiedad existente por ID
router.put('/editar/:id', propiedadController.editarPropiedad);

// Ruta para eliminar una propiedad por ID
router.delete('/eliminar/:id', propiedadController.eliminarPropiedad);

module.exports = router;
