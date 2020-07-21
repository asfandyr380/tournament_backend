const express = require('express');
const route = express.Router();
const pubguser = require('../Models/pubg_user_model');
const { signIn, deleteUser, update } = require('../Controller/user_Controller');
const { check, validationResult } = require('express-validator');

// Create The New User
route.post('/', [
    check('Username', 'Please Enter the Username').notEmpty()
],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    signIn);

// Update current username by ID
route.patch('/update/:id', update);

// Delete user by Id
route.delete('/delete/:deleteId', deleteUser);

module.exports = route