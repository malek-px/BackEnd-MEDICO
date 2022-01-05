const {User} = require('../Models/user');


//Get the users list +TESTED+
const index = (req, res, next) => {
    User.find().select('name email')
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({message:'Could  not show the users list'})
        })
}

//Get assistant name from phone num
const findAssistanseName = (req, res, next) => {
    let phone = req.body.assistantPhone
    console.log(req.body)
    User.find({phone : phone})
        .then(response => {
            console.log(response[0])
            res.json(response[0])
        })
        .catch(error => {
            res.json({message:'Could  not show the assistant'})
        })
}

const getPatients = (req, res, next) => {
    let assistantPhone = req.body.assistantPhone
    User.find({assistantPhone :  assistantPhone}).select('name email')
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({message:'Could  not show the users list'})
        })
}

//Get a user +TESTED+
const show = (req, res, next) =>{
    let userID = req.body.userID 
    User.findById(userID).select('-password')
    .then(response => {
        res.json ({response})
    })
    .catch(error => { message:'The user with the given ID was not found'})
}

//Update a user +TESTED+
const UpdateUser = (req, res, next) => {
    let userID = req.body.userID

    let updateData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        isAssistant: req.body.isAssistant,
        age: req.body.age,
        bloodType: req.body.bloodType,
        assistantPhone: req.body.assistantPhone, 
        assistantName: req.body.assistantName,
        emergencyNum: req.body.emergencyNum,
    }
    User.findByIdAndUpdate(userID, {
            $set: updateData
        })
        .then(() => {
            res.json({message: 'USER updated successfully'})
        })
        .catch(error => {
            res.json({message: 'An error Occured',error})
        })
}

//Delete a user +TESTED+
const DeleteUser = (req, res, next) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
        .then(() => {
            res.json({message: 'USER removed successfully'})
        })
        .catch(error => {
            res.json({message: 'An error Occured !',error})
        })
}

module.exports = { index, show, DeleteUser, UpdateUser , getPatients,findAssistanseName}