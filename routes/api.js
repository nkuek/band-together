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
        // should we push this validation to display?
    })
);

router.delete(
    '/songposts/:id/notes/:noteid/delete',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const songPostNote = await db.Note.findByPk(
            parseInt(req.params.noteid, 10)
        );
        if (songPostNote) {
            await songPostNote.destroy();
            res.json({
                songPostNote
            });
        }
        else {
            next(songPostNote)
        }
    })
);

router.put(
    '/songposts/:id/notes/:noteid/edit',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const songPostNote = await db.Note.findByPk(
            parseInt(req.params.noteid, 10)
        );
        if (songPostNote) {
            songPostNote.body = req.body.body
            songPostNote.save()
            res.json({
                songPostNote
            });
        }
        else {
            next(songPostNote)
        }
    })
);

router.get(
    '/songposts/:id/notes/:noteid/edit',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const songPostNote = await db.Note.findByPk(
            parseInt(req.params.noteid, 10),
            {include: db.User}
        );
        if (songPostNote) {
            res.json({
                songPostNote
            });
        }
        else {
            next(songPostNote)
        }
    })
);

module.exports = router;
