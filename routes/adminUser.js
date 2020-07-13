const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const adminModel = require('../Models/adminUser_model');


route.post('/register', async (req, res) => {

    // Check if user Already Exits
    const userExits = await adminModel.findOne({ username: req.body.username });
    if (userExits) return res.status(400).send('user Already Exits');

    // Hash The Password For Security
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);


    const username = req.body.username;
    const newUser = new adminModel({
        username: username,
        password: hashedPass,
    });
    try {
        if (username == "" || req.body.password == "") {
            res.status(500).send('Invalid Input By User');
        } else {
            const registerUser = await newUser.save();
            res.status(201).json(registerUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



route.post('/logIn', async (req, res) => {

    // login user if it Exits
    const userexits = await adminModel.findOne({ username: req.body.username });
    if (!userexits) return res.status(400).send('Invalid Username');

    // Validate The Password
    const validPass = await bcrypt.compare(req.body.password, userexits.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    const jUser = await adminModel.find({username: req.body.username});
    res.status(200).json(jUser);

});


module.exports = route;