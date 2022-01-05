const express = require('express');
const router = express.Router();
const UserContoller = require('../Controllers/userController')

const authenticate = require('../Middleware/authenticate')

/**
  * @swagger
  * tags:
  *   name: Users Route
  *   description: The users managing APIs
  */

//Get the users list +TESTED+

/**
 * @swagger
 * /api/users/showAll:
 *   get:
 *     tags: [Users]
 *     description: Get all Users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error Could  not show the users list
 */

router.get('/showAll', authenticate, UserContoller.index)

//Get a user +TESTED+

/**
 * @swagger
 * /api/users/showOne:
 *   get:
 *     tags: [Users]
 *     description: Get one User by id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Error! user not found
 */

router.get('/show', UserContoller.show)

//Get list of patient of one assistant
/**
 * @swagger
 * /api/users/showPatients:
 *   get:
 *     tags: [Users]
 *     description: Get patients of one assistant
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Error!
 */
router.get('/showPatients', UserContoller.getPatients)

//Get assitant name from phone num
router.get('/findAssistant', UserContoller.findAssistanseName)

//Update a user +TESTED+
router.post('/updateUser',UserContoller.UpdateUser)

//Delete a user +TESTED+
router.post('/deleteUser', UserContoller.DeleteUser)

//Forget password


module.exports = router;