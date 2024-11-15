require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const entidadInmobiliariaRoutes = require('./routes/entidadInmobiliariaRoutes');
const propiedadesRoutes = require('./routes/propiedadesRoutes'); // Asegúrate de que el nombre y la ruta son correctos
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//rutas 
app.use('/auth', authRoutes);
app.use('/entidad', entidadInmobiliariaRoutes);
app.use('/api', propiedadesRoutes);
app.use('/user',userRoutes);

// Rutas protegidas
app.get('/protected', authMiddleware(['EntidadInmobiliaria','Admin']), (req, res) => {
  res.json({ message: "Ruta protegida", userId: req.userId, role: req.userRole });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));