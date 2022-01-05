const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')

/**
  * @swagger
  * tags:
  *   name: Authentification Route
  *   description: The authentification managing APIs
  */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Registration]
 *     description: registration
 *     parameters: 
 *       in: "body"
 *       required: "true"   
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: Could not register
 */

router.post('/register', authController.register)

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Login]
 *     description: login
 *     parameters: 
 *       in: "body"
 *       required: "true"   
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: Could not login
 */

router.post('/login', authController.login)


module.exports = router