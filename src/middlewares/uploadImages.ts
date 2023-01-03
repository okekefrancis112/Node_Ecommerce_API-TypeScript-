import multer from 'multer';
import sharp from 'sharp';
import path from 'path';


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
});


const multerFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb ({
            message: "Unsupported file format",
        },
        false
        );
    }
};


const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 },
})


const productImgResize = async (req:any, res:any, next:any) => {
    if (!req.files) return next();
    await Promise.all(req.files.map(async (file:any) => {
        await sharp(file.path).resize(300, 300).toFormat('jpeg').jpeg({ quality: 90 })
            .toFile(`public/images/products/${file.filename}`);
    }));
    next();
}



export { uploadPhoto, productImgResize };