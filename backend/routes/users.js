const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { uploadHandlerUser } = require('../middleware/multer');
const { check, validationResult } = require('express-validator');
const authorize = require('../middleware/authorize');

router.get('/:id', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور.' });
  }
});

router.put(
  '/update/:id',
  authorize,
  uploadHandlerUser,
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('لطفا نام کاربری را وارد کنید.'),
    check('email').isEmail().withMessage('لطفا ایمیل معتبری وارد کنید.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      let user = await User.findOne({
        _id: req.params.id,
      });
      let users = await User.find({ _id: { $ne: req.params.id } });
      const emailUser = users.some((u) => u.email === user.email);

      if (emailUser) {
        return res.status(400).json({
          msg: 'کاربر با این ایمیل وجود دارد.',
        });
      }
      const { username, email } = req.body;

      const newUser = new User({
        username,
        email,
      });

      if (req.body.file) {
        newUser.image = req.body.file.path;
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            username: newUser.username,
            email: newUser.email,
            image: newUser.image,
          },
          { new: true }
        );
        return res.status(200).json(updatedUser);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: newUser.username,
          email: newUser.email,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور.' });
    }
  }
);

module.exports = router;
