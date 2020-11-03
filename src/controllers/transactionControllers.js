const mongoose = require('mongoose');
const forge = require("node-forge");
const crypo = require('crypto');

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
            res.json(eWallet.accountDetails);
        })

}


const getAccountDetail = (req, res, next) => {
    eWallet.findById(req.user._id, (err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.json(eWallet.accountDetails);
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
            res.json(eWallet.transactions);
        })
}
const getTransactionById = (req, res, next) => {
    // req.get("https://api.flutterwave.com/v3/transactions");
    // res.json()
    // eWallet.findById(req.user._id, (err, eWallet) => {
    //     if (err) {
    //         res.send(err)
    //     }
    //     res.json(eWallet.accountDetails);
    // });
}
const getTransactions = (req, res, next) => { 
    eWallet.findById(req.user._id, (err, eWallet) => {
        if (err) {
            res.send(err)
        }
        res.json(eWallet.transactions);
    });
}
const addNewBeneficiary = (req, res) => { }
const updateBeneficiaryByID = (req, res) => { }
const getBeneficiaries = (req, res) => { }
const getEnCryptionKeys = (req, res, next) => {
    // let key = "FLWSECK-df67281c015c50187225f22f28abc0b6-X";
    let text = {
        "card_number":"5594410006029997",
        "cvv":"885",
        "expiry_month":"07",
        "expiry_year":"21",
        "currency":"NGN",
        "amount":"200",
        "fullname":"Gideon Amowogbaje",
        "email":"amowogbajegideon@gmail.com",
        "redirect_url":"https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c",
        "authorization":{
           "mode":"pin",
           "pin":"1994"
        }
     }
    //  let key2 = forge.random.getBytesSync(16);
    //  let EncAlgorithm = "AES-CBC";
    //  let EncAlgorithm2 = "3DES-ECB";
    //  let cipher = forge.cipher.createCipher(EncAlgorithm, key2);
    // //  next();
     
    // cipher.start({ iv: "iv" });
    // cipher.update(forge.util.createBuffer("text", "utf-8"));
    // cipher.finish();
    // // console.log(cipher);
    //     // let encrypted = cipher.output;
    //     // console.log(encrypted);
    //     // enckeys = forge.util.encode64(encrypted.getBytes());
    //     // console.log(encKeys);
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const password = "I am a good boy";
    const salt = crypo.randomBytes(32);
    const key = crypto.scryptSync(password, salt, 32);
    const iv = crypo.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // let ssn = '111-000';
    // encrypted = cipher.update(ssn, 'utf8', 'hex');

        res.json("enckeys");

    
}
const exportFunctions = {
    addAccountDetail,
    getAccountDetail,
    addNewTransaction,
    getTransactionById,
    getTransactions,
    addNewBeneficiary,
    updateBeneficiaryByID,
    getBeneficiaries,
    userProfile,
    getEnCryptionKeys
}
module.exports = exportFunctions;
