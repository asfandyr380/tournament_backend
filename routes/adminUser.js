const express = require('express');
const route = express.Router();
const { signIn, register } = require('../Controller/admin_Controller');
const { check, validationResult } = require('express-validator');

route.post('/register',
    [
        check('username', 'Please Enter an Email').notEmpty()
            .isEmail()
            .withMessage('Enter a Valid Email'),
        check('password', "Password Must be 6 Char Long").isLength({ min: 6 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    register);
route.post('/logIn', [
    check('username', 'Please Enter an Email').notEmpty()
        .isEmail()
        .withMessage('Enter a Valid Email'),
    check('password', "Password Must be 6 Char Long").isLength({ min: 6 })
],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    signIn);


module.exports = route;