const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Users',
  },

  username: {
    type: String,
    ref: 'Users',
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  user: {
    username: {
      type: String,
      required: true,
    },
    userimage: {
      type: String,
      required: true,
    },
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
    trim: true,
  },

  likes: {
    like: {
      type: Number,
      required: true,
      default: 0,
    },
    users: [mongoose.Types.ObjectId],
  },

  reviews: [reviewSchema],
});

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
