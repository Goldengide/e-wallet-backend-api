const express = require('express'),
    bodyParser = require("body-parser"),
    logger = require('morgan'),
    path = require('path'),
    session = require('cookie-session');

const { authRoutes } = require('./src/routes/authRoutes');
const { transanctionRoutes } = require('./src/routes/transactionRoutes')

const mongoose = require('mongoose');

const app = express();

const port = 3605;

// log requests to the console
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static("public"));
// trust first proxy
app.set('trust proxy', 1)

// store user session data
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secureProxy: true,
            httpOnly: true,
            domain: 'cookie.com'
        }
    })
);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ewalletdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to e-wallet-backend-api",
        status: 200
    })
});

authRoutes(app);
transanctionRoutes(app);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));


// User Logout
app.get('/logout', (req, res, next) => {
    req.logout();
    res.status(200).send({
        message: "Logged Out Successfully"
    })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // return a 404 response
//     res.status(err.status || 500).send({
//         message: "Page can not be found!"
//     })
// })

// export the module
module.exports = app;
