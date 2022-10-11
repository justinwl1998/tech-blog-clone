const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

// todo: redirect to login if not logged in

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
            where: {
                user_id: req.session.user_id,
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        
        posts.reverse();

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;