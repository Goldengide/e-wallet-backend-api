// const express = require('express'),
require('../middlewares/auth');
const {loginAction, RegisterAction, loginPost, RegisterGet, getAllUsers, deleteEWallet, loginWithPassport} = require('../controllers/authControllers');
authRoutes = (app) => {
    app.route('/login')
        .get(loginAction)
        .post(loginWithPassport);
    app.route('/register')
        .get(RegisterGet)
        .post(RegisterAction);
    app.route('/users')
        .get(getAllUsers)
        .delete(deleteEWallet);
} 

module.exports = {authRoutes};