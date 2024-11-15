
const express = require('express');
const router = express.Router();
const EntidadInmobiliariaController = require('../controllers/entidadInmobiliariaController');

// Ruta para insertar un nuevo profesor
router.post('/crear', EntidadInmobiliariaController.crearEntidad);

// Ruta para listar todos los profesores
router.get('/listar', EntidadInmobiliariaController.listarEntidad);

// Ruta para editar un profesor existente por ID
router.put('/editar/:id', EntidadInmobiliariaController.editarEntidad);

// Ruta para eliminar un profesor por ID
router.delete('/eliminar/:id', EntidadInmobiliariaController.eliminarEntidad);

module.exports = router;
