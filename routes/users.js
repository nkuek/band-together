const express = require('express');
const { asyncHandler } = require('./utils');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post(
    '/',
    asyncHandler(async (req, res) => {})
);
module.exports = router;
