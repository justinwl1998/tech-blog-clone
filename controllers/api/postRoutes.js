const router = require('express').Router();
const { Blogpost } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newPost = await Blogpost.create({
        title: req.body.title,
        description: req.body.desc,
        user_id: req.session.user_id,
      });


      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;