const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');

router.get('/', async(req, res) => {
    try {
        res.render('homepage');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;