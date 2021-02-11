const express = require('express');
const { uploadHandlerPost } = require('../middleware/multer');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');
const authorize = require('../middleware/authorize');

router.get('/', authorize, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createDate: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/:id', authorize, async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.params.id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/detail/:id', authorize, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
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
      const username = req.user.username;
      const userimage = req.user.image;
      const post = await Post.create({
        creator,
        title,
        message,
        user: {
          username,
          userimage,
        },
        image: file.path,
        reviews: [],
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { title, message } = req.body;
      const post = new Post({
        title,
        message,
      });
      const creator = req.user._id;
      if (req.body.file) {
        post.image = req.body.file.path;
        const newPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            creator,
            title: post.title,
            message: post.message,
            image: post.image,
          },
          { new: true }
        );

        const users = await User.find({});

        const updatedUsers = users.map(async (user) => {
          if (user.favorites.length > 0) {
            const index = user.favorites.findIndex(
              (fav) => fav._id === post._id
            );
            if (user.creator != post.creator) {
              user.favorites.splice(index, 1, newPost);
              await user.save();
            }
          } else {
            return user;
          }
        });
        return res.status(201).json(newPost);
      }

      const newPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          creator,
          title: post.title,
          message: post.message,
        },
        { new: true }
      );

      const users = await User.find({});

      const updatedUsers = users.map(async (user) => {
        if (user.favorites.length > 0) {
          const index = user.favorites.findIndex((fav) => fav._id == post._id);
          if (user.creator != post.creator) {
            user.favorites.splice(index, 1, newPost);
            await user.save();
          }
        } else {
          return user;
        }
      });

      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.delete('/delete/:id', authorize, async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    const users = await User.find({});

    const updatedUsers = users.map(async (user) => {
      const index = user.favorites.findIndex((fav) => fav._id === post._id);
      user.favorites.splice(index, 1);
      await user.save();
      return user;
    });

    await updatedUsers.save((err) => {
      if (err) return err;
    });
    return res.status(200).json({
      creator: post.creator,
      id: post._id,
      msg: 'پست با موفقیت حذف گردید',
    });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.post(
  '/review/:id',
  authorize,
  [check('comment').not().isEmpty().withMessage('لطفا نظر خود را بنویسید.')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { comment } = req.body;
      const creator = req.user._id;
      const post = await Post.findById(req.params.id);

      const alreadyReviewed = post.reviews.find(
        (r) => r.userId.toString() === creator.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ msg: 'نظر شما ثبت شده است.' });
      }

      const review = {
        username: req.user.username,
        comment,
        userId: creator,
      };

      post.reviews.push(review);

      await post.save();
      return res.status(200).json({ msg: 'نظر شما ثبت شد.' });
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.get('/reviews/:id', authorize, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({ reviews: post.reviews });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.put('/likes/:id', authorize, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.users.includes(req.user._id);

    if (alreadyLiked)
      return res.status(400).json({ msg: 'شما این پست را پسندیده اید.' });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        likes: {
          like: post.likes.like + 1,
          users: [...post.likes.users, req.user._id],
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
