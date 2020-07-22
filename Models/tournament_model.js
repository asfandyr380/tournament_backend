const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    roomId: {
        type: String,
        require: true
    },
    roomPass: {
        type: String,
        require: true
    },
    joined: {
        type: Number
    },
    mapType:
    {
        type: String,
        require: true
    },
    type:
    {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    joinedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }]
});

module.exports = mongoose.model('tournament', tournamentSchema);