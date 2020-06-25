const mongoose = require('mongoose');

const pubgUserSchema = mongoose.Schema({

    PubgUsername:{
        require: true,
        type: String
    },
    Date:{
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('Pubgusername', pubgUserSchema);