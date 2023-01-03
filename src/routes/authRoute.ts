import express from "express";

import {
    createUser,
    loginUserCtrl,
    getallUsers,
    getUser,
    deleteUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus
} from "../controller/userCtrl";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/register', createUser );
router.post('/forgot-password-token', forgotPasswordToken  );
router.put('/reset-password/:token', resetPassword );


router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/cart', authMiddleware, userCart);
router.get('/cart', authMiddleware,  getUserCart );
router.post('/cart/applycoupon', authMiddleware, applyCoupon );
router.post('/admin-login', loginAdmin);

router.get('/all-users', getallUsers);
router.get('/get-orders', authMiddleware, getOrders );
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);
router.get('/refresh', handleRefreshToken);
router.get('/logout',  logoutUser);
router.get('/wishlist', authMiddleware, getWishList );
router.post('/cart/cash-order', authMiddleware, createOrder);

router.get('/:id', authMiddleware, isAdmin, getUser );
router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', deleteUser );

router.put('/edit-user', authMiddleware, updatedUser );
router.put('/save-address', authMiddleware,saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser );
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


export {router as authRouter}