const express = require('express');
const route = express.Router();
const pubguser = require('../Models/pubg_user_model');



// Create The New User
route.post('/', async (req, res) => {
    const user = new pubguser({
        PubgUsername: req.body.PubgUsername,
    });
    try {
        if (req.body.PubgUsername == "") {
            res.status(400).send('Invalid username');
        } else {
            const saveduser = user.save();
            res.status(201).json(saveduser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get the Current Username
route.get('/:userid', async (req, res) => {
    const id = req.params.userid;
    try {
        const currentUser = await pubguser.findById(id,
            (err) => {
                res.status(400).json({ message: err.message });
            });
        res.status(200).json(currentUser.PubgUsername);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update current username by ID
route.patch('/updateuser/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const option = { new: true }
    try {
        const updateduser = await pubguser.findByIdAndUpdate(id, body, option, (err) => {
            res.status(400).json({ message: err.message });
        });
        res.status(201).json(updateduser.PubgUsername);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete user by Id
route.delete('/deleteuser/:delid', async (req, res) => {
    const id = req.params.delid
    try {
        await pubguser.findByIdAndDelete(id, (err) => {
            res.status(400).json(err);
        });
        res.status(201).send('Successfuly Deleted user');
    } catch (err) {
        res.status(500).json({ message: err });
    }
});




module.exports = route