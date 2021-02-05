var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

/* GET home page. */
router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const songPosts = await db.SongPost.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
        res.render('home', { title: 'Welcome to Band-Together', songPosts });
    })
);

module.exports = router;
