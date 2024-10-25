const express = require('express');
const bcrypt = require('bcryptjs');  // Para el hash de contraseñas
const jwt = require('jsonwebtoken'); // Para manejar JWT
const app = express();
const port = 3000;

app.use(express.json());

// Clave secreta para firmar los tokens
const jwtSecret = 'supersecretkey';

// Simulando una base de datos en memoria
let users = {
    1: {
        id: 1,
        name: 'Pedro Mamani',
        email: 'armando@gmail.com',
        password: bcrypt.hashSync('123456', 8), // Contraseña hashada
        phone: '77146181',
        address: 'Quillacollo',
        zone: 'Sur',
        deliveryNotes: 'En Plena Esquina'
    }
};

// Función para generar JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: '1h' // Expira en 1 hora
    });
}

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token requerido.');
    }

    jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido.');
        }
        req.userId = decoded.id;
        next();
    });
}

// Ruta para login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Email o contraseña incorrectos.');
    }

    const token = generateToken(user);
    res.send({ auth: true, token });
});

// Obtener información de usuario (solo el usuario autenticado puede acceder)
app.get('/api/user/:id', verifyToken, (req, res) => {
    const user = users[req.params.id];
    if (user && user.id === req.userId) {
        res.send(user);
    } else {
        res.status(403).send('Acceso denegado.');
    }
});

// Actualizar información de usuario (solo el usuario autenticado puede actualizar su perfil)
app.put('/api/user/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    if (users[id] && users[id].id === req.userId) {
        const updatedUser = req.body;
        users[id] = { ...users[id], ...updatedUser };
        res.send(users[id]);
    } else {
        res.status(403).send('Acceso denegado.');
    }
});

// Eliminar usuario (solo el usuario autenticado puede eliminar su perfil)
app.delete('/api/user/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    if (users[id] && users[id].id === req.userId) {
        delete users[id];
        res.send('Usuario eliminado.');
    } else {
        res.status(403).send('Acceso denegado.');
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
