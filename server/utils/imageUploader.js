const fs = require('fs');
const path = require('path');
const multer = require('multer');

const imageUploader = imagePath => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      var appDir = path.dirname(require.main.filename);

      const fullPath = path.join(appDir, imagePath);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      callback(null, fullPath);
    },
    filename: (req, file, callback) => {
      callback(null, new Date().toISOString() + '-' + file.originalname);
    },
  });

  return multer({
    storage: fileStorage,
    limits: {
      fileSize: 3e+6,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
        return cb(new Error('Please upload a valid image'));

      cb(null, true);
    },
  });
};

module.exports = imageUploader;
