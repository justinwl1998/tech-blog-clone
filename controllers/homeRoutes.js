const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');

router.get('/', async(req, res) => {
    try {
        const postData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async(req, res) => {
    try {
        const postData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;