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
});

module.exports = mongoose.model('admin', adminSchema);