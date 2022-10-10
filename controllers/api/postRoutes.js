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

router.put('/', async (req, res) => {
  try {
    const updatedPost = await Blogpost.update({
      title: req.body.title,
      description: req.body.desc,
      date_updated: req.body.newDate
    },
    {where: { id: req.body.post_id },
  });

  res.status(200).json(updatedPost);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedPost = await Blogpost.destroy({
      where: {id: req.body.post_id}
    });

    res.status(200).json(deletedPost);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;