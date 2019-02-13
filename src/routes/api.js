const { Router } = require('express');
const app = Router();

//Requerir Auth
const isAuthenticated = require('../../services/Auth');

const Users = require('../controllers/Users');

//User Routes
app.get('/users', isAuthenticated, Users.index);

//Auth Routes
app.post('/auth/signup', Users.signup);
app.post('/auth/login', Users.login);

module.exports = app;