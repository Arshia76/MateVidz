const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/');
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
      next();
    }
  });
};

module.exports = {
  uploadHandlerUser,
  uploadHandlerPost,
};
