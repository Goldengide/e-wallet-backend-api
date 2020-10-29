// const express = require('express'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');
require('../middlewares/auth');
const {loginAction, RegisterAction, loginPost, RegisterGet, getAllUsers, deleteEWallet} = require('../controllers/authControllers');
authRoutes = (app) => {
    app.route('/login')
        .get(loginAction)
        .post(
            async (req, res, next) => {
                passport.authenticate(
                  'login',
                  async (err, user, info) => {
                    try {
                      if (err || !user) {
                        const error = new Error('An error occurred.');
    
                        return next(error);
                      }
            
                      req.login(
                        user,
                        { session: false },
                        async (error) => {
                          if (error) return next(error);
            
                          const body = { _id: user._id, email: user.email };
                          const token = jwt.sign({ user: body }, 'TOP_SECRET');
            
                          return res.json({ token });
                        }
                      );
                    } catch (error) {
                      return next(error);
                    }
                  }
                )(req, res, next);
              }
        );
    app.route('/register')
        .get(RegisterGet)
        .post(RegisterAction);
    app.route('/users')
        .get(getAllUsers)
        .delete(deleteEWallet);
} 

module.exports = {authRoutes};