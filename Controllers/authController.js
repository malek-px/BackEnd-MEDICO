const {User} = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

//REGISTER +TESTED+
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User ({

            name: req.body.name,
            email: req.body.email,
            password: hashedPass ,
            phone: req.body.phone,
            address: req.body.address,
            isAssistant: req.body.isAssistant,
            age: req.body.age,
            bloodType: req.body.bloodType,
            assistantPhone: req.body.assistantPhone, 
            assistantName: req.body.assistantName,
            emergencyNum: req.body.emergencyNum,

        })
         user.save()
         .then(user => {
             res.json ({ message: "User Added Successfully"})
         })
         .catch (err => {
             return res.status(400).send("An ERROR occured")
         })
    })
}

//LOGIN +TESTED+
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}, {phone: username}]})
    .then( user => {
        if(user) {
            bcrypt.compare(password, user.password, function (err, result){
                if(err) {
                    res.json ({error: err})
                }
                if(result) {
                    let token = jwt.sign({name: user.name}, 'secretValue', {expiresIn:'1h'})
                    res.json (user)
                }
                else {
                    res.status(404)
                    res.json({message:'WRONG PASSWORD'})
                }
            }
        )}
        else {
            res.status(404)
            res.json ({message:'USER not found'})
        }
    })
}

module.exports = { register, login };