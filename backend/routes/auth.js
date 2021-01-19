const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();
const router = express.Router();
const { uploadHandlerUser } = require('../middleware/multer');
const authorize = require('../middleware/authorize');

//Register

router.post(
  '/register',
  uploadHandlerUser,
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('لطفا نام کاربری را وارد کنید.'),
    check('email').isEmail().withMessage('لطفا ایمیل معتبری وارد کنید.'),
    check('password')
      .isLength({
        min: 6,
      })
      .withMessage('کلمه عبور باید حداقل 6 کلمه باشد.'),
    check('file').not().isEmpty().withMessage('لطفا عکس پروفایل انتخاب کنید'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password, file } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        res.status(400).json({
          msg: 'کاربر با این ایمیل وجود دارد.',
        });
      }

      let user1 = await User.findOne({
        username,
      });
      if (user1) {
        res.status(400).json({
          msg: 'کاربر با این نام کاربری وجود دارد.',
        });
      }

      if (!file)
        return res.status(400).json({
          msg: 'عکس پروفایل را انتخاب کنید',
        });

      user = new User({
        username,
        email,
        password,
        image: file.path,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      jwt.sign(
        { user },
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({ id: user._id, username, token, image });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('خطای سرور');
    }
  }
);

// login
router.post(
  '/login',
  [
    check('email', 'ایمیل صحیحی را وارد کنید').isEmail(),
    check('password', 'کلمه عبور را وارد کنید').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (!user) {
        res.status(400).json({
          msg: 'کاربری با این مشخصات وجود ندارد.',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          msg: 'کاربری با این مشخصات وجود ندارد.',
        });

      await user.save();

      jwt.sign(
        { user },
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            id: user._id,
            username: user.username,
            token,
            image: user.image,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('خطای سرور');
    }
  }
);

router.get('/user', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res
      .status(200)
      .json({ creator: user._id, user: user.username, image: user.image });
  } catch (err) {
    return res.status(400).json({ msg: 'ابتدا وارد سایت شوید' });
  }
});

module.exports = router;
