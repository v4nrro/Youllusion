const express = require('express');
const mongoose = require('mongoose');

const posts = require(__dirname + '/routes/posts');
const comments = require(__dirname + '/routes/comments')
const users = require(__dirname + '/routes/users');

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/youllusion');

// Servidor Express
let app = express();

// Middleware para peticiones POST, PUT y GET
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/users', users);

// Puesta en marcha del servidor
app.listen(8080);