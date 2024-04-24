const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, callback) => {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    },
});

const fileFilter = (req, file, callback) => {
    const allowedMimes = ['image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Loại tệp không hợp lệ. Chỉ cho phép hình ảnh JPEG và PNG.'), false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter,
});

module.exports = upload;