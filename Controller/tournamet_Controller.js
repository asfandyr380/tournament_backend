const tournament = require('../Models/tournament_model');

exports.create = async (req, res) => {

    const data = new tournament({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        roomId: req.body.roomId,
        roomPass: req.body.roomPass,
        joined: req.body.joined,
        mapType: req.body.mapType,
        type: req.body.type,
    });
    try {
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const info = await tournament.find();
        if (info == null) {
            res.status(500).send('No tournaments are available');
        } else { res.status(200).json(info); }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateOne = async (req, res) =>
{
    const id = req.params.id;
    const body = req.body;
    const option = { new: true };

    const update = await tournament.findByIdAndUpdate(id, body, option);
    try {
        res.status(201).json(update);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteOne = async (req, res) =>
{
    const id = req.params.id;
    try {
        await tournament.findByIdAndDelete(id);
        res.status(201).send('Successfuly Deleted One Document');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}