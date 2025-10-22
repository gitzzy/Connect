const express = require('express');
const { registerValidator, loginValidator } = require('../helper/signupValidator');
const { signUp, temp, signUp2, signIn } = require('../controllers/userController');
const router = express.Router();


router.post('/signup',registerValidator,signUp)
router.post('/signin',loginValidator,signIn)


module.exports = router