const mongoose = require('mongoose');

const pubgUserSchema = mongoose.Schema({

    Username:{
        require: true,
        type: String
    },
    Date:{
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('User', pubgUserSchema);