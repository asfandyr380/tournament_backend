const mongoose  = require('mongoose');

const tournamentSchema = mongoose.Schema({
    title: {
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
    }
});

module.exports = mongoose.model('tournament', tournamentSchema);