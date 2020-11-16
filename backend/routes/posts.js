const express = require('express');
const { uploadHandlerPost } = require('../middleware/multer');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../models/Post');
const authorize = require('../middleware/authorize');

router.get('/', authorize, async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.post(
  '/create',
  authorize,
  uploadHandlerPost,
  [
    check('title').not().isEmpty().withMessage('لطفا عنوان را وارد کنید.'),
    check('message').not().isEmpty().withMessage('لطفا پیام پست را وارد کنید.'),
    check('file').not().isEmpty().withMessage('لطفا عکس را انتخاب کنید.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { title, message, file } = req.body;

      const creator = req.user._id;
      const post = await Post.create({
        creator,
        title,
        message,
        image: file.path,
      });
      return res.status(201).json(post);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.put(
  '/update/:id',
  authorize,
  uploadHandlerPost,
  [
    check('title').not().isEmpty().withMessage('لطفا عنوان را وارد کنید.'),
    check('message').not().isEmpty().withMessage('لطفا پیام پست را وارد کنید.'),
    check('file').not().isEmpty().withMessage('لطفا عکس را انتخاب کنید.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { title, message, file } = req.body;
      const creator = req.user._id;
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          creator,
          title,
          message,
          image: file.path,
        },
        { new: true }
      );
      return res.status(201).json(post);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.delete('/delete/:id', authorize, async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      creator: post.creator,
      id: post._id,
      msg: 'پست با موفقیت حذف گردید',
    });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
