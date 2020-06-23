require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());

// Routes
const tournaments = require('./routes/tournaments');


// Connect to the Database
mongoose.connect(process.env.CONNECTDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
}, () => {
    console.log('Database is Connected');
});




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Middlewares
app.use('/tournaments', tournaments);



app.listen(3000, () => { console.log("server is up and Running") });