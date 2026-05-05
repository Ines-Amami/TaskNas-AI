import multer from 'multer';
import path from 'path';
import fs from 'fs';

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const fileFilter = (req, file, cb) => {
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file.originalname)
    ? cb(null, true)
    : cb(new Error('Images only!'), false);
};

export default multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });