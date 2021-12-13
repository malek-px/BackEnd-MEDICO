const express = require('express');
const router = express.Router();
const {User} = require('../Models/user');
const UserContoller = require('../Controllers/userController')

const authenticate = require('../Middleware/authenticate')

//Get the users list +TESTED+
router.get('/showAll', authenticate, UserContoller.index)

//Get a user +TESTED+
router.get('/show', UserContoller.show)



module.exports = router;