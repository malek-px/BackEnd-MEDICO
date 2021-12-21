const express = require('express');
const router = express.Router();
const UserContoller = require('../Controllers/userController')

const authenticate = require('../Middleware/authenticate')

//Get the users list +TESTED+
router.get('/showAll', authenticate, UserContoller.index)

//Get a user +TESTED+
router.get('/show', UserContoller.show)

//Update a user +TESTED+
router.post('/updateUser',UserContoller.UpdateUser)

//Delete a user +TESTED+
router.post('/deleteUser', UserContoller.DeleteUser)

module.exports = router;