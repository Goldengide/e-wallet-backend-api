const mongoose = require('mongoose'),
    { Schema, SchemaTypes } = require("mongoose"),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const beneficiarySchema = new Schema({
    name: { type: String, default: "XXX" },
    email: { type: String, default: "XXX" },
    email: { type: String, default: "XXX" },
    phone: { type: String, default: "XXX" },
    userID: {type: String, required: "The UserID is required to validate that the benefiary is real"}
})
const transactionSchema = new Schema({
    date: {type: Date, default: Date.now},
    time: {type: String, default: "Date.now.getTime()"},
    statement: {type: String},
    // beneficiaryID: {type: String},
    transactionType: {
        type: String, 
        required: "transaction type required",
        enum: {
            values: ['withdrawal', 'transfer', 'payment'],
            message: 'options are restricted to withdrawal, transfer, payment'
        },
    }
})

const accountDetailSchema = new Schema({
    currency: {type: String, default: "naira"},
    balance: {type: Number , default: 0.00},
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
            message: '{ VALUE } is not a valid email address'
        },
        required: [true, "User Email is required"]
    },
    phone: {
        type: String,
        valdate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{ VALUE } is not a valid phone number!'
        },
        required: [true, 'User Phone number required']
    },
    password: {
        type: String,
        min: [8, "The password must not be shorter than 8 characters"],
        required: [true, 'User Password required']
    },
    accountDetails: accountDetailSchema,
    transactions: {transactionSchema},
    beneficiaries: {beneficiarySchema}
})

eWalletSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
eWalletSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const eWallet = mongoose.model('eWallet', eWalletSchema);

module.exports = eWallet;