const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
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
});

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
