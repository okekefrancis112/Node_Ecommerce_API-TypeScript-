import express from "express";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware";

import {
     createProduct,
     getProduct,
     getAllProducts,
     updateProduct,
     deleteProduct,
     addToWishlist,
     rating,
     uploadImages,
     } from "../controller/productCtrl";
import { uploadPhoto, productImgResize } from "../middlewares/uploadImages";


const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put(
     '/upload/:id',
     authMiddleware,
     isAdmin,
     uploadPhoto.array("images", 10),
     productImgResize,
     uploadImages
     );
router.put('/wishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProducts);

export {router as productRouter}