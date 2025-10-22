const { check } = require('express-validator')

exports.registerValidator = [
    check('name','Name is Required').not().isEmpty(),
    check('username','Username is Required').not().isEmpty(),
    check('password','Password is Required').not().isEmpty(),
    check('phone','Phone is Required').not().isEmpty()
]

exports.loginValidator = [
    check('username','Username is Required').not().isEmpty(),
    check('password','Password is Required').not().isEmpty()
]