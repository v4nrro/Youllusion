const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const auth = require(__dirname + '/routes/auth')
const posts = require(__dirname + '/routes/posts');
const comments = require(__dirname + '/routes/comments')
const users = require(__dirname + '/routes/users');

// Load .env variables
dotenv.config();

// DB connection
mongoose.connect(process.env.DATABASE_URL);

// Express server
let app = express();

// Allow only requests from Angular app
app.use(cors({
    origin: 'http://localhost:4200'
}));

// JSON parser
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', auth)
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/users', users);

// Listen on declared port
app.listen(process.env.PORT);