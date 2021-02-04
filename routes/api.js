const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { requireAuth } = require('../auth');
const db = require('../db/models/');
const router = express.Router();

const notesValidation = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for your note'),
];

router.post(
    '/songposts/:id/notes',
    requireAuth,
    notesValidation,
    asyncHandler(async (req, res) => {
        const { body } = req.body;
        const validationErrors = validationResult(req);
        const note = db.Note.build({
            userId: res.locals.user.id,
            songPostId: req.params.id,
        });
        if (validationErrors.isEmpty()) {
            note.body = body;
            await note.save();
            const user = await db.User.findByPk(note.userId);
            res.json({ note, username: user.username });
        }
    })
);

router.delete(
    '/api/songposts/:id/notes/:noteid/delete',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const songPost = await db.SongPost.findByPk(
            parseInt(req.params.id, 10)
        );
        if (songPost) {
            await songPost.destroy();
            res.status(204).end();
        }
        next(songPost);
    })
);

router.delete(
    '/api/songposts/:id/',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const songPostNotes = await db.Note.findAll({
            where: { songPostId: req.params.id },
            include: db.SongPost,
        });
        const songPost = await db.SongPost.findByPk(
            parseInt(req.params.id, 10)
        );
        console.log(songPostNotes);
        if (songPost) {
            if (songPostNotes) {
                songPostNotes.forEach(async (note) => await note.destroy());
            }
            await songPost.destroy();
            res.redirect('/');
        }
        next(songPost);
    })
);

module.exports = router;
