const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());  // Para procesar el cuerpo de las solicitudes como JSON
app.use(cors());  // Para permitir solicitudes desde el frontend

// Configuración de transporte de correo usando Gmail o cualquier otro servicio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Esto depende del servicio de correo que uses
  auth: {
    user: 'tu-correo@gmail.com',  // Pon aquí tu correo electrónico
    pass: 'tu-contraseña'  // La contraseña de tu correo (usa contraseñas de aplicación si es Gmail)
  }
});

// Ruta para enviar el correo electrónico
app.post('/enviar-mensaje', (req, res) => {
  const { email, total } = req.body;  // Extrae el email y el total desde el cuerpo de la petición

  const mailOptions = {
    from: 'tu-correo@gmail.com',
    to: email,
    subject: 'Confirmación de Compra',
    text: `Gracias por tu compra. El total de tu pedido es Bs. ${total}.`
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error enviando el correo');
    }
    console.log('Correo enviado: ' + info.response);
    res.status(200).send('Correo enviado exitosamente');
  });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
