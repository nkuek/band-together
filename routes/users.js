const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { asyncHandler } = require('./utils');
const { User } = require('../db/models/');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

const userValidation = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a username')
        .isLength({ max: 50 })
        .withMessage('Username must not be greater than 50 characters.')
        .custom((value) => {
            return User.findOne({ where: { username: value } }).then((user) => {
                if (user) return Promise.reject('Username already in use.');
            });
        }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter an email')
        .isLength({ max: 50 })
        .withMessage('Email must not be greater than 50 characters.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then((user) => {
                if (user) return Promise.reject('Email already in use.');
            });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a password')
        .isLength({ max: 50 })
        .withMessage('Password cannot exceed 50 characters.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage(
            'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
        ),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please confirm your password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password cannot exceed 50 characters.')
        .custom((value) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
];

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
    })
);

module.exports = router;
