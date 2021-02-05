const express = require('express');
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models/');
const { requireAuth } = require('../auth');
const { Op } = require('sequelize');
const user = require('../db/models/user');

const router = express.Router();

router.get(
    '/:search',
    requireAuth,
    asyncHandler(async (req, res) => {
        const users = await db.User.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${req.params.search}%`,
                },
            },
        });
        const searching = await db.SongPost.findAll({
            where: {
                [Op.or]: {
                    songTitle: {
                        [Op.iLike]: `%${req.params.search}%`,
                    },
                    artist: {
                        [Op.iLike]: `%${req.params.search}%`,
                    },
                    postTitle: {
                        [Op.iLike]: `%${req.params.search}%`,
                    },
                },
            },
        });

        res.render('search', { users, searching });
    })
);

module.exports = router;
