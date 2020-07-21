const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
        require: true,
        type: String,
    },
    password:{
        require: true,
        type: String,
    },
    tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournaments"
    }]
});

module.exports = mongoose.model('admin', adminSchema);