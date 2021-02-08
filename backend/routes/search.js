const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const { check, validationResult } = require('express-validator');

router.post(
  '/user',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('لطفا نام کاربر برای جستجو را وارد کنید.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { username } = req.body;
      const user = await User.findOne({ username: username });

      if (!user)
        return res.status(404).json({ msg: 'چنین کاربری وجود ندارد.' });
      const posts = await Post.find({ creator: user._id }).sort({
        createDate: -1,
      });
      if (posts === null || !posts)
        return res.status(404).json({ msg: 'این کاربر پستی ندارد.' });
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور.' });
    }
  }
);

module.exports = router;
