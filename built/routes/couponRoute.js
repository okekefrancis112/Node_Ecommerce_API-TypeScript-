var express = require("express");
var _a = require("../controller/couponCtrl"), createCoupon = _a.createCoupon, getAllCoupons = _a.getAllCoupons, updateCoupons = _a.updateCoupons, deleteCoupons = _a.deleteCoupons;
var _b = require("../middlewares/authMiddleware"), authMiddleware = _b.authMiddleware, isAdmin = _b.isAdmin;
var router = express.Router();
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.put("/:id", authMiddleware, isAdmin, updateCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupons);
module.exports = router;
