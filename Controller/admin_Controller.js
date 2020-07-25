const adminUser = require('../Models/adminUser_model');
const bcrypt = require('bcrypt');

exports.signIn = async (req, res) =>
{
    // Check if User is Registered or not
    const userRegistered = await adminUser.findOne({username: req.body.username});
    if (!userRegistered) return res.status(400).send("No User Exists");

    // Check for password Validation
    const validatePass = await bcrypt.compare(req.body.password, userRegistered.password);
    if(!validatePass) return res.status(400).send("Not a Valid Password");

    const user = await adminUser.findOne({username: req.body.username});
    res.status(200).send(user);
}

exports.register = async (req, res) =>
{
    // Check if User Exists
    const userExists = await adminUser.findOne({username: req.body.username});
    if(userExists) return res.status(400).send('Username Already Taken');

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    const admin = new adminUser({
        username: req.body.username,
        password: hashedpass,
    });
    try{
        const savedAdmin = await admin.save();
        res.status(201).json(savedAdmin);
    }catch(err)
    {
        res.status(400).json(err);
    }
}