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

        posts.reverse();

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in 
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
                {
                    model: Comment,
                    attributes: ['content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                    order: [
                        ['date_created', 'DESC']
                    ]
                }
            ],
        });

        const post = postData.get({ plain: true });
        const userOwnsPost = post.user_id === req.session.user_id;

        // reverse order of comments, because apparently order in sequelize doesn't quite work
        post.comments = post.comments.reverse();

        console.log(post.comments);

        //todo: add variable for if the post being viewed belongs to the original poster

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            userOwnsPost: userOwnsPost
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/editpost/:id', async (req, res) => {
    try {
        const postData = await Blogpost.findByPk(req.params.id)

        const post = postData.get({ plain: true });

        res.render('editpost', {
            ...post
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        console.log("you're going to brazil")
        res.redirect('/');
        return;
    }

    console.log("okay go to login")
    res.render('login');
})

module.exports = router;