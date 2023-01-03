import express from "express";


import {
    createCoupon,
    getAllCoupons,
    updateCoupons,
    deleteCoupons
} from "../controller/couponCtrl";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";


const router = express.Router();



router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.put("/:id", authMiddleware, isAdmin, updateCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupons);

export {router as couponRouter}