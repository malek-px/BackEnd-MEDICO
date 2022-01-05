const express = require('express');
const router = express.Router();
const UserContoller = require('../Controllers/userController')
const nodemailer = require('nodemailer');

const authenticate = require('../Middleware/authenticate')

//Get the users list +TESTED+
router.get('/showAll', authenticate, UserContoller.index)

//Get a user +TESTED+
router.get('/show', UserContoller.show)

//Get list of patient of one assistant
router.get('/showPatients', UserContoller.getPatients)

//Get assitant name from phone num
router.post('/findAssistant', UserContoller.findAssistanseName)

//Update a user +TESTED+
router.post('/updateUser',UserContoller.UpdateUser)

//Delete a user +TESTED+
router.post('/deleteUser', UserContoller.DeleteUser)

//Forget password


module.exports = router;