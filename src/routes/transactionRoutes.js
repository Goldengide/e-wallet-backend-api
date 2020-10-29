const passport = require('passport');
const transanctionRoutes = require('express').Router();
const accountRoutes = require('express').Router();
const { userProfile, addAccountDetail, getAccountDetail, getBeneficiaries, addNewBeneficiary, getTransactions, addNewTransaction, getTransactionById} = require('../controllers/transactionControllers');
// const transanctionRoutes = (app) => {
    transanctionRoutes.route('/user/profile')

        .get(userProfile);

    accountRoutes.route('/')

        .get(getAccountDetail)

        .put(addAccountDetail)
    
        .post(addAccountDetail);


    transanctionRoutes.route('/benefiary/:UserID')
        .get(getBeneficiaries)

        .post(addNewBeneficiary);


    transanctionRoutes.route('/')

        .get(getTransactions)

        .post(addNewTransaction);


    transanctionRoutes.route('/transactions/:UserID/:transactionID')
        .get(getTransactionById)
// } 

module.exports = {transanctionRoutes, accountRoutes};