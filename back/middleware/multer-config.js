import multer from 'multer';

let  MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/mp4': 'mp4',
  'image/mkv': 'mkv',
  'image/webp': 'webp',
  
};

// With this setup, when a file is uploaded using a multipart form with the field name 'image', the multer middleware will handle the file upload, save the file to the 'images' directory, and provide the necessary information about the uploaded file to the subsequent middleware or route handler.
// Indicate to multer where to save incoming files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

export default multer({storage: storage}).single('image');
