const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middleware/validation');

router.post('/register', validation.validation, userController.register)

router.get('/all', userController.findAllUser)

router.get('/user/email/:email', userController.findUserByEmail)

router.get('/user/name/:userName', userController.findUserByName)


router.delete('/user/name/:userName', userController.deleteUser)


module.exports = router;
