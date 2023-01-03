import { Request, Response } from 'express';
import User from '../models/userModel';
import Product from '../models/productModel';
import Cart from '../models/cartModel';
import Coupon from '../models/couponModel';
import Order from '../models/orderModel';
import { isPasswordMatched } from '../utils/password'

import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/jwtToken';
import {validateMongoDbId} from '../utils/validateMongodbid';
import { generateRefreshToken } from '../config/refreshtoken';
import jwt from 'jsonwebtoken';
import {sendEmail} from './emailCtrl';
import crypto from 'crypto';
import uniqid from 'uniqid';


// Register a User
const createUser = asyncHandler(async(req:Request, res:Response) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email:email });

    if (!findUser) {

        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);

    } else {
        // User Already Exists.
        throw new Error('User Already Exists.');
    }
});


// Login User
const loginUserCtrl = asyncHandler(async (req:any, res:any) => {
    const { email, password } = req.body;
    // Check if user exists or not

    const findUser = await User.findOne({ email });

    if (findUser && await isPasswordMatched(password, findUser.password)) {
        // const refreshToken = generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
            // refreshToken: refreshToken,
        },
        { new: true }
        );
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     maxAge: 72 * 60 * 60 * 1000,
        // });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            // token: generateToken(findUser?._id),
        });
    } else {
        throw new Error ("Invalid Credentials.");
    }

});


// Admin Login
const loginAdmin = asyncHandler(async (req:Request, res:Response) => {
    const { email, password } = req.body;
    console.log(password)
    // Check if user exists or not

    const findAdmin:any = await User.findOne({ email });
    console.log(email)

    if (findAdmin.role !== 'admin') throw new Error("Not Authorised.");

    if (findAdmin && await isPasswordMatched(password, findAdmin.password)) {
        const refreshToken = generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id,
            {
            refreshToken: refreshToken,
        },
        { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error ("Invalid Credentials.");
    }

});


// Update a user
const updatedUser =  asyncHandler (async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
             {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
        },
        {
            new: true,
        }
        );
        res.json(updatedUser);
    } catch (error:any) {
        throw new Error (error);
    }
});


// Save User Address
const saveAddress = asyncHandler(async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
             {
                address: req?.body?.address,
            },
        {
            new: true,
        }
        );
        res.json(updatedUser);
    } catch (error:any) {
        throw new Error (error);
    }
});


// Get all users
const getallUsers = asyncHandler (async (req:Request, res:Response) => {
    try {
        const getUsers =  await User.find();
        res.json(getUsers);
    } catch (error:any) {
        throw new Error (error);
    }
});


// Get a user
const getUser = asyncHandler (async (req:Request, res:Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getUser = await User.findById( id);
        res.json({
            getUser,
        });
    } catch (error:any) {
        throw new Error (error);
    }
});


// Handle refresh token
const handleRefreshToken = asyncHandler(async (req:Request, res:Response) => {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie.refreshToken) throw new Error("No refresh token in Cookies.");
    const refreshToken = cookie.refreshToken;
    // console.log(refreshToken);
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) throw new Error("No refresh token in db or not matched.");
    jwt.verify(refreshToken, process.env.JWT_SECRET || "", (err:any, decoded:any) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token.");
        }
        const accessToken = generateToken(user?.id);
        res.json({accessToken});
    });
});


// Logout User
const logoutUser = asyncHandler(async (req:any, res:any) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken) throw new Error("No refresh token in Cookies.");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // Forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // Forbidden
});


// Delete a user
const deleteUser = asyncHandler (async (req:Request, res:Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    } catch (error:any) {
        throw new Error (error);
    }
});


const blockUser = asyncHandler(async (req:Request, res:Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User Blocked",
        });
    } catch (error:any) {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler(async (req:Request, res:Response) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });
    } catch (error:any) {
        throw new Error(error);
    }
});


// Update a user password
const updatePassword = asyncHandler(async (req:any, res:any) => {
    const { _id } = req.user;
    const {password} = req.body;
    validateMongoDbId(_id);

    const user:any = await User.findById(_id);

    if (password){
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});


// Forgot Password Token
const forgotPasswordToken = asyncHandler(async (req:any, res:any) => {
    // console.log(req.body)
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found with this email address");
    try {
        const token = await user.schema.methods.createPasswordResetToken();
        await user.save();
        const resetURL = "Hi, Please follow this link to reset your password. \
        This link is valid for 10 minutes from now.\
        <a href=`http://localhost:5000/api/user/reset-password/${token}`> Click Here </a>";
        const data:any = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,
        };
        // console.log(data.to);
        // @ts-nocheck
        sendEmail(data, req, res);
        res.json(token);
    } catch (error:any) {
        throw new Error("not working", error);
    }
});


// Reset Password

const resetPassword = asyncHandler(async (req:Request, res:Response) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired. Please try again later.");
    user.password = password;
    user.passwordResetToken = undefined || '';
    user.passwordResetExpires = undefined || '';
    await user.save();
    res.json(user);
});


// Get wishlist
const getWishList = asyncHandler(async (req:any, res:any) => {
    // console.log(req.user);

    const { _id } = req.user._id;
    // console.log(_id);

    validateMongoDbId(_id);
    try {
        const findUser = await User.findById(_id).populate('wishlist');
        res.json(findUser);
    } catch (error:any) {
        throw new Error(error);
    }
});


interface Options {
    product: string;
    count: number;
    color: string;
    price: string;
  }

// Add User cart
const userCart = asyncHandler(async (req:any, res:Response) => {

    const { cart } = req.body;
    const { _id } = req.user;

    validateMongoDbId(_id);
    try {
        let products:any = [];
        const user = await User.findById(_id);

        // Check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderby: user?._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {} as Options;
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice:any = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice?.price;
            products.push(object);
        }
        console.log(products);
        let cartTotal:any = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal += products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id,
        }).save();
        res.json(newCart);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get User Cart
const getUserCart = asyncHandler(async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try{
        const cart = await Cart.findOne({ orderby: _id }).populate(
            "products.product",
            // "_id title price totalAfterDiscount",
        );
        res.json(cart);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Empty Cart
const emptyCart = asyncHandler(async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try{
        const user = await User.findOne({ _id: _id })
        const cart = await Cart.findOneAndRemove({ orderby: user?._id });
        res.json(cart);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Coupon Added
const applyCoupon = asyncHandler(async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    // console.log(validCoupon);
    if (validCoupon === null) {
        throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });

    let { cartTotal }:any = await Cart?.findOne({
        orderby: user?._id,
    }).populate("products.product");
    let totalAfterDiscount = (
        cartTotal - ( cartTotal + validCoupon.discount ) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate (
        { orderby: user?._id },
        { totalAfterDiscount: totalAfterDiscount},
        { new: true }
    );
    res.json(totalAfterDiscount);
});


// Create Order
const createOrder =asyncHandler(async(req:any, res:Response) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) throw new Error("Create cash order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user?._id });
        let finalAmount:any = 0;
        if ( couponApplied && userCart?.totalAfterDiscount ) {
            finalAmount = userCart?.totalAfterDiscount;
        } else {
            finalAmount = userCart?.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart?.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on Delivery",
                createdAt: Date.now(),
                currency: "usd",
            },
            orderby: user?._id,
            orderStatus: "Cash on Delivery",
        }).save();

        let update:any = userCart?.products?.map((item:any) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count }},
                },
            };
        });
        const updated = Product.bulkWrite(update, {});
        res.json({ message: "success" });
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get Orders
const getOrders = asyncHandler(async (req:any, res:Response) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const userOrders = await Order.findOne({ orderby: _id })
            .populate("products.product")
            .exec();
        res.json(userOrders);
    } catch (error:any) {
        throw new Error(error);
    }
});



// Update Order
const updateOrderStatus = asyncHandler( async (req:Request, res:Response) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const updateOrder = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            { new: true }
        );
        res.json(updateOrder);
    }catch(error:any){
        throw new Error(error)
    }
});

export {
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
    updateOrderStatus,
};