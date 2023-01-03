var express = require("express");
var router = express.Router();
var _a = require("../controller/userCtrl"), createUser = _a.createUser, loginUserCtrl = _a.loginUserCtrl, getallUsers = _a.getallUsers, getUser = _a.getUser, deleteUser = _a.deleteUser, updatedUser = _a.updatedUser, blockUser = _a.blockUser, unblockUser = _a.unblockUser, handleRefreshToken = _a.handleRefreshToken, logoutUser = _a.logoutUser, updatePassword = _a.updatePassword, forgotPasswordToken = _a.forgotPasswordToken, resetPassword = _a.resetPassword, loginAdmin = _a.loginAdmin, getWishList = _a.getWishList, saveAddress = _a.saveAddress, userCart = _a.userCart, getUserCart = _a.getUserCart, emptyCart = _a.emptyCart, applyCoupon = _a.applyCoupon, createOrder = _a.createOrder, getOrders = _a.getOrders, updateOrderStatus = _a.updateOrderStatus;
var _b = require("../middlewares/authMiddleware"), authMiddleware = _b.authMiddleware, isAdmin = _b.isAdmin;
router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/cart', authMiddleware, userCart);
router.get('/cart', authMiddleware, getUserCart);
router.post('/cart/applycoupon', authMiddleware, applyCoupon);
router.post('/admin-login', loginAdmin);
router.get('/all-users', getallUsers);
router.get('/get-orders', authMiddleware, getOrders);
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.get('/wishlist', authMiddleware, getWishList);
router.post('/cart/cash-order', authMiddleware, createOrder);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updatedUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
module.exports = router;