const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    LocalStrategy = require('passport-local').Strategy,
    eWallet = require('../models/models');


const loginPost = (req, res) => {
    res.status(200).send({ message: `Logged in successfully as user, ${req.body.email}` })
}

const  loginWithPassport = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    // const error = new Error('An error occurred.');

                    return res.json({ success: false, message: info.message });
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, 'TOP_SECRET');

                        return res.json({ success: true, message: info.message, token });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}
const loginAction = (req, res) => {
    res.send({ message: `this.... loggin in` })
}

const RegisterGet = (req, res) => {
    res.json("Register in....")
}
const RegisterAction = (req, res) => {
    let newAccount = new eWallet(req.body);
    // res.json(newAccount);
    newAccount.save((err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.send(eWallet);
    })
}

const getAllUsers = (req, res) => {
    eWallet.find({}, (err, Users) => {
        if (err) {
            res.send(err)
        }
        res.json({ Users });
    })
}
const deleteEWallet = (req, res) => {
    eWallet.deleteMany((err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.json("All datas have been deleted")
    })
}



module.exports = { loginAction, loginPost, loginWithPassport, RegisterAction, RegisterGet, getAllUsers, deleteEWallet }