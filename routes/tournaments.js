const express = require('express');
const router = express.Router();
const { create, getAll, updateOne, deleteOne, addJoinedUser, findJoinedUsers} = require('../Controller/tournamet_Controller');
const { check, validationResult } = require('express-validator');

// Get all the tournaments info
router.get('/', getAll);

// Post a Single tournament info
router.post('/', [
    check('title', 'Enter a title').notEmpty(),
    check('roomId', 'Enter Room ID').notEmpty(),
    check('roomPass', 'Enter Room Pass').notEmpty(),
    check('mapType', 'Enter a Map').notEmpty(),
    check('type', 'Enter a Type').notEmpty(),
    check('date', 'Enter a date').notEmpty(),
    check('time', 'Enter a Time').notEmpty()
],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    create);

// Update the JoinedUser Array
router.post('/updatejoin/:id', addJoinedUser);

// get all Joined users
router.get('/joined/:id', findJoinedUsers);

// Update an existing tournament info
router.patch('/update/:id', updateOne);

// Delete an existing tournament info
router.delete('/delete/:id', deleteOne);


module.exports = router