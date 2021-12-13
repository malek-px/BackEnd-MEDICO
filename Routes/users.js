const express = require('express');
const router = express.Router();
const {User} = require('../Models/user');

//Get the users list +TESTED+
router.get(`/show`, async (req, res) =>{
    const userList = await User.find().select('name email');
    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList);
})

//Get a user +TESTED+
router.get(`/show/:id`, async (req, res) =>{
    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    res.status(200).send(user);
})

module.exports = router;