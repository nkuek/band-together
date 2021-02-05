const express = require('express')
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models/');
const { requireAuth } = require('../auth');
const { Op } = require('sequelize')

const router = express.Router()

router.get("/:search", requireAuth, asyncHandler(async (req, res) => {
    const searching = await db.SongPost.findAll({
        where: {
            songTitle: {
                [Op.iLike]: `%` + req.params.search + `%`
            },
            artist: {
                [Op.iLike]: `%` + req.params.search + `%`
            }
        },
        include:{
            model:db.User,
            where: {
                username: {
                    [Op.iLike]: `%` + req.params.search + `%`
                },
            }
        }
    })
    res.json(searching)
}))


module.exports = router
