const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config/secret');
const sessionStore = new MongoStore({ url: config.database, autoReconnect: true });

//CONNECT TO DATABASE WITH MONGOOSE
mongoose.connect(config.database,  { useNewUrlParser: true },(err)=> {
    if(err)
        console.log(err);
    else{
        console.log('Connected to Database');
    }
});

//STORE SESSION IN MONGODB
const sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret || process.env.SECRET,
    store: sessionStore
});



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(sessionMiddleware);


const userRoutes = require('./routes/user');
app.use(userRoutes);


app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});