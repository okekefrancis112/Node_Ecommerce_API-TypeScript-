import express from "express";


import {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand
} from "../controller/brandCtrl";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";


const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);
router.get('/:id', getBrand);
router.get('/', getAllBrand);

export {router as brandRouter}