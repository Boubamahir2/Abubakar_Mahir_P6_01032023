import multer from 'multer';
import path from 'path';

const multerStorage = multer.diskStorage({
   filename: function (req, file, cb){
    // create unique string for each file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
   }
});

const whiteListMediaTypes = ['.png', '.jpeg', '.jpg', '.mp4', '.mkv', '.webp'];

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname).toLowerCase();
   if (!whiteListMediaTypes.includes(ext)) {
     cb({ message: 'Unsupported file format' }, false);
     return;
   }
   cb(null, true);
}

const multerMiddleware = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5MB
});

export default multerMiddleware;