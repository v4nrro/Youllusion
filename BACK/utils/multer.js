const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileTypes = /mp4|mkv|avi|mov|jpg|jpeg|png|gif/;
        const extname = path.extname(file.originalname).toLowerCase();

        if (fileTypes.test(extname)) {
            if (/mp4|mkv|avi|mov/.test(extname)) {
                cb(null, "public/uploads/videos");
            } else {
                cb(null, "public/uploads/images");
            }
        } else {
            cb(new Error("Invalid file type"));
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const videoImageUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /mp4|mkv|avi|mov|jpg|jpeg|png|gif/;
        const extname = allowedExtensions.test(
            path.extname(file.originalname).toLowerCase().replace('.', '')
        );
        
        const allowedMimeTypes = /^(video\/|image\/)/;
        const mimetype = allowedMimeTypes.test(file.mimetype);
    
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Only video and image files are allowed"));
        }
    }
});

const imageUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /jpg|jpeg|png|gif|webp|svg/;
        const extname = allowedExtensions.test(
            path.extname(file.originalname).toLowerCase().replace('.', '')
        );
        
        const allowedMimeTypes = /^image\//;
        const mimetype = allowedMimeTypes.test(file.mimetype);
    
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

module.exports = {
    videoImageUpload,
    imageUpload,
};