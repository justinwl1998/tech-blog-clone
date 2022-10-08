const router = require('express').Router();
const { Blogpost } = require('../../models');

router.post('/', async (req, res) => {
    try {
      res.status(200).json();
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;