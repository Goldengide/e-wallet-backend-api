const passport = require('passport');
const { addAccountDetail, getAccountDetail, getBeneficiaries, addNewBeneficiary, getTransactions, addNewTransaction, getTransactionById} = require('../controllers/transactionControllers');
transanctionRoutes = (app) => {
    app.route('/account-details/:UserID')

        .get(getAccountDetail)

        .put(addAccountDetail)

        .post(addAccountDetail);


    app.route('/benefiary/:UserID')
        .get(getBeneficiaries)

        .post(addNewBeneficiary);


    app.route('/transactions/:UserID')

        .get(getTransactions)

        .post(addNewTransaction);


    app.route('/transactions/:UserID/:transactionID')
        .get(getTransactionById)
} 

module.exports = {transanctionRoutes};