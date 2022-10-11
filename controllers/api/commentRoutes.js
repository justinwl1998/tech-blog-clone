const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {id: req.body.comment_id }
    });

    res.status(200).json(deletedComment);
  }
  catch (err) {
    res.status(400).json(err);
  }
})
module.exports = router;