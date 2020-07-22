const user = require('../Models/pubg_user_model');

exports.signIn = async (req,res) => 
{   
    // Check if Username already Exists in the database
    const checkusername = await user.findOne({Username: req.body.Username});
    if(checkusername) return res.status(200).send("User already Exists Just LogIn");

    const newUser = new user({
        Username: req.body.Username
    });
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err)
    {
        res.status(400).json(err);
    }
}

exports.deleteUser = async (req, res) => 
{
    const deleteId = req.params.deleteId;
    try {
        await user.findByIdAndDelete(deleteId);
        res.status(201).send('Successfuly Deleted user');
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.update = async (req, res) =>
{
    const updateid = req.params.id
    const body = req.body
    const option = { new: true }
    try {
        const updateduser = await user.findByIdAndUpdate(updateid, body, option);
        res.status(201).json(updateduser.Username);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}