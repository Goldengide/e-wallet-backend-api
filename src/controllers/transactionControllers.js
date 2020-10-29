const mongoose = require('mongoose');


// const { response } = require('express');
const eWallet = require('../models/models');

const userProfile = (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
const addAccountDetail = (req, res, next) => {
    eWallet.findByIdAndUpdate(
        { _id: req.user._id },
        { accountDetails: req.body },
        // {$push: {accountDetails: req.body}},
        { new: true, useFindAndModify: false },
        (err, eWallet) => {
            if (err) {
                res.send(err)
            }
            res.json(eWallet);
        })

}


const getAccountDetail = (req, res, next) => {
    eWallet.findById(req.user._id, (err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.json(eWallet);
    });
}

const addNewTransaction = (req, res, next) => {
    eWallet.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { transactions: req.body } },
        { new: true, useFindAndModify: false },
        (err, eWallet) => {
            if (err) {
                res.send(err)
            }
            res.json(eWallet);
        })
}
const getTransactionById = (req, res, next) => {
    res.json({
        message: "this route is secure",
        user: Users,
        token: req.query.secret_token
    })
}
const getTransactions = (req, res) => { }
const addNewBeneficiary = (req, res) => { }
const updateBeneficiaryByID = (req, res) => { }
const getBeneficiaries = (req, res) => { }
const exportFunctions = {
    addAccountDetail,
    getAccountDetail,
    addNewTransaction,
    getTransactionById,
    getTransactions,
    addNewBeneficiary,
    updateBeneficiaryByID,
    getBeneficiaries,
    userProfile
}
module.exports = exportFunctions;
