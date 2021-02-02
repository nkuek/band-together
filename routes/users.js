const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const db = require('../db/models/');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
    res.end();
});

const userValidation = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a username')
        .isLength({ max: 50 })
        .withMessage('Username must not be greater than 50 characters.')
        .custom((value) => {
            return db.User.findOne({ where: { username: value } }).then(
                (user) => {
                    if (user) return Promise.reject('Username already in use.');
                }
            );
        }),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter an email')
        .isLength({ max: 50 })
        .withMessage('Email must not be greater than 50 characters.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .custom((value) => {
            return db.User.findOne({ where: { email: value } }).then((user) => {
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
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
];

router.post(
    '/',
    userValidation,
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        const validationErrors = validationResult(req);
        console.log(validationErrors);
        const user = db.User.build({
            username,
            email,
        });
        if (validationErrors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.hashedPassword = hashedPassword;
            await user.save();
            loginUser(req, res, user);
            req.session.save(res.redirect('/'));
        } else {
            const errors = validationErrors.array().map((error) => error.msg);
            console.log(errors);
            res.render('index', {
                title: 'Register',
                user,
                errors,
                token: req.csrfToken()
            });
        }
    })
);

router.get('/login', csrfProtection, (req, res) => {
    //res.render('login', {})
    res.end('Welcome to the login page.')
})

router.post('/login', asyncHandler(async(req, res) => {
    const {username, password} = req.body;
    const user = await db.User.findOne({where: {username}})
    const isValid = await bcrypt.compare(password, user.hashedPassword.toString())
    if(isValid){
        loginUser(req, res, user);
        req.session.save(res.redirect('/users/login'));
    } else{
        res.end('Username password combination not valid')
    }
}))

module.exports = router;
