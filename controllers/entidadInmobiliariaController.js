// controllers/EntidadController.js
const bcrypt = require('bcryptjs');
const { Persona, EntidadInmobiliaria, Users, Roles} = require('../models');


exports.crearEntidad = async (req, res) => {
  const { documento, nombres, apellidos, telefono, direccion, email } = req.body;

  try {
    // Verificar si ya existe una persona con ese documento
    const personaExistente = await Persona.findOne({ where: { documento } });
    if (personaExistente) {
      return res.status(400).json({ message: "La persona ya está registrada" });
    }

    // Crear una nueva Persona
    const nuevaPersona = await Persona.create({
      documento,
      nombres,
      apellidos,
      telefono,
      direccion,
      email
    });

    // Crear un nuevo Profesor asociado a la Persona
    const nuevoEntidad = await EntidadInmobiliaria.create({
      id_persona: nuevaPersona.id,  // Asociar con la nueva persona
      documento
    });

    // Extraer la parte del email antes del @ para el nombre de usuario
    const username = email.split('@')[0];

    // Buscar el rol "entidad Inmobiliaria"
    const role = await Roles.findOne({ where: { roleName: 'EntidadInmobiliaria' } });
    if (!role) {
      return res.status(400).json({ message: "Rol 'inmobiliaria' no encontrado" });
    }

    // Hashear el documento (que es la contraseña) para el usuario
    const hashedPassword = await bcrypt.hash(documento, 10);

    // Crear un nuevo Usuario asociado a la Persona
    const nuevoUsuario = await Users.create({
      id_persona: nuevaPersona.id,
      id_rol: role.id,
      username,  // Username será la parte antes del @ en el correo
      password: hashedPassword  // Contraseña será el documento hasheado
    });

    res.status(201).json({
      message: 'entidad y usuario creados exitosamente',
      data: { nuevaPersona, nuevoEntidad, nuevoUsuario }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear el profesor',
      error: error.message
    });
  }
};



exports.listarEntidad = async (req, res) => {
  try {
    const EntidadInmobiliarias = await EntidadInmobiliaria.findAll({
      include: [
       {  model: Persona, 
          as: 'persona',
          include: [
            { model: Users, as: 'usuario' }  // Incluye 'Users' a través de 'Persona'
          ]
        }   // Incluye información del usuario asociado
      ]
    });

    res.status(200).json({ EntidadInmobiliarias});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar los profesores', error: error.message });
  }
};


exports.eliminarEntidad = async (req, res) => {
  const { id } = req.params; // ID del profesor a eliminar

  try {
    // Buscar al profesor por ID
    const EntidadInmobiliarias = await EntidadInmobiliaria.findByPk(id);
    if (!EntidadInmobiliarias) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    // Eliminar el profesor (esto también puede eliminar la persona y usuario asociados si se desea)
    await EntidadInmobiliarias.destroy();

    res.status(200).json({ message: 'Profesor eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
  }
};


exports.editarEntidad = async (req, res) => {
  const { id } = req.params; // ID del profesor a editar
  const { documento, nombres, apellidos, sexo, telefono, direccion, email, username, password } = req.body;

  try {
    // Buscar al profesor por ID
    const EntidadInmobiliarias = await EntidadInmobiliaria.findByPk(id, { include: [{model: Persona, as: 'persona'}]});
    if (!EntidadInmobiliarias) {
      return res.status(404).json({ message: "Entidad no encontrado" });
    }

    // Actualizar la información de la persona
    await EntidadInmobiliarias.persona.update({
      documento,
      nombres,
      apellidos,
      telefono,
      direccion,
      email
    });

    // Actualizar el usuario si se envía una nueva contraseña o username
    const usuario = await Users.findOne({ where: { id_persona: EntidadInmobiliarias.id_persona } });
    if (usuario) {
      let newPassword = usuario.password;
      if (password) {
        newPassword = await bcrypt.hash(password, 10);  // Si hay nueva contraseña, la hasheamos
      }

      await usuario.update({
        username: username || usuario.username, // Si no se envía un nuevo username, se mantiene el actual
        password: newPassword
      });
    }
      
    res.status(200).json({ message: "Entidad actualizado exitosamente", EntidadInmobiliarias });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar el Entidad", error: error.message });
  }
};

