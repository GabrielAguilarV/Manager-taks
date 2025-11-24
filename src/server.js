import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// Ruta al archivo JSON
const dataPath = path.resolve('src/data/usuariosFake.json');

const app = express();
app.use(cors());
app.use(express.json());

// Leer usuarios
app.get('/api/usuarios', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data.users);
  } catch (error) {
    console.error('Error leyendo usuarios:', error);
    res.status(500).json({ error: 'Error al leer los usuarios' });
  }
});

// Actualizar EdoCta
app.put('/api/usuarios/:id/edocuenta', (req, res) => {
  const { id } = req.params;
  const { newState } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const updatedUsers = data.users.map(user =>
      user.id === id ? { ...user, EdoCta: newState } : user
    );
    data.users = updatedUsers;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true, users: updatedUsers });
  } catch (error) {
    console.error('Error actualizando EdoCta:', error);
    res.status(500).json({ error: 'Error al actualizar EdoCta' });
  }
});

// Puerto
const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`));
