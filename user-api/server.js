const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

// Simulando una base de datos en memoria
let users = {
    1: {
      id: 1,
      name: 'Pedro Perez',
      email: 'Pedro@gmail.com',
      phone: '77448855',
      address: 'Cercado',
      zone: 'Norte',
      deliveryNotes: 'Puerta Roja.'
    }
  };
  
// Obtener info de usuario
app.get('/api/user/:id', (req, res) => {
    const user = users[req.params.id];
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  });

// Actualizar info de usuario
app.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    if (users[id]) {
      const updatedUser = req.body;
      users[id] = { ...users[id], ...updatedUser }; 
      res.send(users[id]);
    } else {
      res.status(404).send('User not found');
    }
  });

// Eliminar usuario
app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;
    if (users[id]) {
      delete users[id];
      res.send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
