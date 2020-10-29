const mongoose = require('mongoose');


// const { response } = require('express');
const eWallet = require('../models/models');


const addAccountDetail = (req, res) => {
    eWallet.findByIdAndUpdate(
        { _id: req.params.UserID },
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


const getAccountDetail = (req, res) => {
    eWallet.findById(req.params.UserID, (err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.json(eWallet.accountDetail);
    });
}

const addNewTransaction = (req, res) => {
    eWallet.findByIdAndUpdate(
        { _id: req.params.UserID },
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
    getBeneficiaries
}
module.exports = exportFunctions;
