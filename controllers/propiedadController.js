const { Propiedades } = require('../models');

// Crear una nueva propiedad
exports.crearPropiedad = async (req, res) => {
  const { tipo, dirreccion, barrio, precio, habitaciones, banos, area, descripcion } = req.body;

  try {
    const nuevaPropiedad = await Propiedades.create({
      tipo,
      dirreccion,
      barrio,
      precio,
      habitaciones,
      banos,
      area,
      descripcion
    });

    res.status(201).json({
      message: 'Propiedad creada exitosamente',
      data: nuevaPropiedad
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear la propiedad',
      error: error.message
    });
  }
};

// Listar todas las propiedades
exports.listarPropiedades = async (req, res) => {
  try {
    const propiedades = await Propiedades.findAll();
    res.status(200).json({
      message: 'Propiedades listadas exitosamente',
      data: propiedades
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al listar las propiedades',
      error: error.message
    });
  }
};

// Editar una propiedad existente
exports.editarPropiedad = async (req, res) => {
  const { id } = req.params;
  const { tipo, direccion, barrio, precio, habitaciones, banos, area, descripcion } = req.body;

  try {
    const propiedad = await Propiedades.findByPk(id);
    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    await propiedad.update({
      tipo,
      direccion,
      barrio,
      precio,
      habitaciones,
      banos,
      area,
      descripcion
    });

    res.status(200).json({
      message: 'Propiedad actualizada exitosamente',
      data: propiedad
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar la propiedad',
      error: error.message
    });
  }
};

// Eliminar una propiedad
exports.eliminarPropiedad = async (req, res) => {
  const { id } = req.params;

  try {
    const propiedad = await Propiedades.findByPk(id);
    if (!propiedad) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    await propiedad.destroy();
    res.status(200).json({ message: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al eliminar la propiedad',
      error: error.message
    });
  }
};