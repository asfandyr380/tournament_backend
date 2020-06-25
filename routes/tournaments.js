const express = require('express');
const tournament = require('../Models/tournament_model');
const router = express.Router();

// Get all the tournaments info
router.get('/', async (req, res) => {
    try {
        const info = await tournament.find();
        if (info == null) {
            res.status(500).send('No tournaments are available');
        } else { res.status(200).json(info); }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Post a Single tournament info
router.post('/', async (req, res) => {
    var title = req.body.title
    var time = req.body.time
    var roomId = req.body.roomId
    var roomPass = req.body.roomPass
    var mapType = req.body.mapType
    var type = req.body.type

    const data = new tournament({
        title: title,
        time: time,
        roomId: roomId,
        roomPass: roomPass,
        joined: req.body.joined,
        mapType: mapType,
        type: type,
    });
    try {
        if (title == "" ||
            time == "" ||
            roomPass == "" ||
            roomId == "" ||
            mapType == "" ||
            type == "") {
            res.status(400).send('Something is wrong with your info');
        } else {
            const savedData = await data.save();
            res.status(201).json(savedData);
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Update an existing tournament info
router.patch('/updateOne/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const option = { new: true };

    const update = await tournament.findByIdAndUpdate(id, body, option);
    try {
        res.status(201).json(update);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Delete an existing tournament info
router.delete('/deleteOne/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await tournament.findByIdAndDelete(id, (err) => {
            res.status(400).json({ message: err.message });
        });
        res.status(201).send('Successfuly Deleted One Document');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});


module.exports = router