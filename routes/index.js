var express = require('express');
const { default: UploadController } = require('../controllers/uploadController');
var router = express.Router();

router.put('/uncompressed-image-upload', UploadController.uncompressedImageUpload);
router.get('/', (req, res, next) => {return res.status(200).json({"message": "hello"})});
module.exports = router;
