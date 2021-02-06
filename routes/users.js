const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const db = require('../db/models/');
const router = express.Router();

/* GET users listing. */
router.get('/register', csrfProtection, function (req, res, next) {
    res.render('register', { csrfToken: req.csrfToken() });
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
    '/register',
    csrfProtection,
    userValidation,
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
            return req.session.save((e) => {
                console.log(e);
                res.redirect('/');
            });
        } else {
            const errors = validationErrors.array().map((error) => error.msg);
            res.render('register', {
                title: 'Register',
                username: user.username,
                email: user.email,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

const loginValidation = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a password'),
];

router.get('/login', csrfProtection, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
});

router.post(
    '/login',
    csrfProtection,
    loginValidation,
    asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        const validationErrors = validationResult(req);
        let errors = [];
        if (validationErrors.isEmpty()) {
            const user = await db.User.findOne({ where: { username } });
            if (user) {
                const isValid = await bcrypt.compare(
                    password,
                    user.hashedPassword.toString()
                );
                if (isValid) {
                    loginUser(req, res, user);
                    // console.log(req.session.auth);
                    return req.session.save((e) => {
                        console.log(e);
                        res.redirect('/');
                    });
                } else {
                    errors.push('Username password combination not valid');
                }
            } else {
                errors.push('Username password combination not valid');
            }
        } else {
            errors = validationErrors.array().map((error) => error.msg);
        }
        console.log(errors);
        res.render('login', {
            errors,
            username,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    return req.session.save((e) => {
        console.log(e);
        res.redirect('/');
    });
});

router.get(
    '/:username/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const user = await db.User.findOne({
            where: { username: req.params.username },
            include: db.SongPost,
            order: [[db.SongPost, 'createdAt', 'DESC']],
        });
        // res.json(user)
        res.render('profile', { userProfile: user });
    })
);

module.exports = router;
