import express from "express";


import {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} from "../controller/productCategoryCtrl";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";


const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCategory);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategory);

export {router as categoryRouter}