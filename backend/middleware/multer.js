const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
var uploadUser = multer({ storage: storage }).single('userImage');
const uploadHandlerUser = (req, res, next) => {
  uploadUser(req, res, (err) => {
    if (err) {
      res
        .status(400)
        .json({ message: `Bad request, ${err.message}` })
        .end();
    } else {
      // special workaround for files validating with express-validator
      req.body.file = req.file;
      if (req.body.file) {
        cloudinary.uploader.upload(
          (path = req.file.path),
          { public_id: `MateVidz/${new Date().toISOString()}` }, // directory and tags are optional
          function (err, image) {
            if (err) return res.json({ msg: err });
            console.log('file uploaded to Cloudinary');
            // remove file from server
            const fs = require('fs');
            fs.unlinkSync(path);
            // return image details
            req.photo = image.secure_url;
          }
        );
      }
      next();
    }
  });
};

var uploadPost = multer({ storage: storage }).single('postImage');
const uploadHandlerPost = (req, res, next) => {
  uploadPost(req, res, (err) => {
    if (err) {
      res
        .status(400)
        .json({ message: `Bad request, ${err.message}` })
        .end();
    } else {
      // special workaround for files validating with express-validator
      req.body.file = req.file;
      console.log('not found');
      if (req.body.file) {
        cloudinary.uploader.upload(
          (path = req.file.path),
          { public_id: `MateVidz/${new Date().toISOString()}` }, // directory and tags are optional
          function (err, image) {
            if (err) return res.json({ msg: err });
            console.log('file uploaded to Cloudinary');
            // remove file from server
            const fs = require('fs');
            fs.unlinkSync(path);
            // return image details
            req.body.file = image.secure_url;
          }
        );
      }
      next();
    }
  });
};

module.exports = {
  uploadHandlerUser,
  uploadHandlerPost,
};
