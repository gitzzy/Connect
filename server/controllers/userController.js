const { validationResult } = require("express-validator");
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation error",
                error: errors.array(),
            });
        }

        const { name, username, phone, password } = req.body;

        // Check if username already exists
        if (await userModel.findOne({ username })) {
            return res.status(400).json({
                success: false,
                msg: 'Username is already in use'
            });
        }

        // Check if phone already exists
        if (await userModel.findOne({ phone })) {
            return res.status(400).json({
                success: false,
                msg: 'Phone number is already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            name,
            phone,
            password: hashedPassword,
            isPhoneVerified: true
        });

        res.status(201).json({ success: true, msg: 'Account created', userId: newUser._id });

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
};

const signIn = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Validation error",
                error: errors.array(),
            });
        }

        const {username,password} = req.body

        const userExists = await userModel.findOne({username})
        if(!userExists) res.status(400).json({success: false, msg: "username does not exists",})
        
       const isMatch =  await bcrypt.compare(password,userExists.password)
       if(!isMatch) res.status(400).json({success: false, msg: "Username or Password is wrong",})
        res.status(200).json({
            success:true,
            msg:`Welcome ${username}`
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
}

module.exports = { signUp, signIn };
