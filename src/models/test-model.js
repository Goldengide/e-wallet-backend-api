const { Schema, SchemaTypes } = require("mongoose");


const beneficiarySchema = new Schema({
    name: { type: String, default: "XXX" },
    email: { type: String, default: "XXX" },
    email: { type: String, default: "XXX" },
    phone: { type: String, default: "XXX" },
})
const transactionSchema = new Schema({
    date: {type: Date, default: Date.now},
    time: {type: String, default: "Date.now.getTime()"},
    statement: {type: String, default: "XXX"},
    transactionType: {type: String, default: "XXX"},
    beneficiary: [beneficiarySchema]
})

const accountDetailSchema = new Schema({
    currency: {type: String, default: "naira"},
    balance: {type: String, default: "XXX"}
});


const eWalletSchema = new Schema({
    firstname: { type: String, required: "Enter your firstname" },
    lastname: { type: String, required: "Enter your lastname" },
    email: { 
        type: String, 
        validate: {
            validator: function(v) {
               return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: '{VALUE} is not a valid email address'
        },
        required: [true, "User Email is required"]
    },
    phone: {
        type: String,
        valdate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User Phone number required']
    },
    password: {
        type: String,
        min: [8, "The password must not be shorter than 8 characters"],
        required: [true, 'User Phone number required']
    },
    accountDetails: [accountDetailSchema],
    transactions: [transactionSchema]
})

module.exports = { eWalletSchema, accountDetailSchema, transactionSchema, beneficiarySchema}