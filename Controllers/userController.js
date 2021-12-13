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

//Get a user +TESTED+
const show = (req, res, next) =>{
    let userID = req.body.userID 
    User.findById(userID).select('-password')
    .then(response => {
        res.json ({response})
    })
    .catch(error => { message:'The user with the given ID was not found'})
}

module.exports = { index, show }