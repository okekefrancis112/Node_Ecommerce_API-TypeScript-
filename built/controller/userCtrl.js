var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var User = require('../models/userModel');
var Product = require('../models/productModel');
var Cart = require('../models/cartModel');
var Coupon = require('../models/couponModel');
var Order = require('../models/orderModel');
var asyncHandler = require('express-async-handler');
var generateToken = require('../config/jwtToken').generateToken;
var validateMongoDbId = require('../utils/validateMongodbid');
var generateRefreshToken = require('../config/refreshtoken').generateRefreshToken;
var jwt = require('jsonwebtoken');
var sendEmail = require('./emailCtrl');
var crypto = require('crypto');
var uniqid = require('uniqid');
var response = require('express').response;
// Register a User
var createUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, findUser, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                findUser = _a.sent();
                if (!!findUser) return [3 /*break*/, 3];
                return [4 /*yield*/, User.create(req.body)];
            case 2:
                newUser = _a.sent();
                res.json(newUser);
                return [3 /*break*/, 4];
            case 3: 
            // User Already Exists.
            throw new Error('User Already Exists.');
            case 4: return [2 /*return*/];
        }
    });
}); });
// Login User
var loginUserCtrl = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, findUser, _b, refreshToken, updateuser;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                findUser = _c.sent();
                _b = findUser;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, findUser.isPasswordMatched(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (!_b) return [3 /*break*/, 6];
                return [4 /*yield*/, generateRefreshToken(findUser === null || findUser === void 0 ? void 0 : findUser._id)];
            case 4:
                refreshToken = _c.sent();
                return [4 /*yield*/, User.findByIdAndUpdate(findUser.id, {
                        refreshToken: refreshToken,
                    }, { new: true })];
            case 5:
                updateuser = _c.sent();
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000,
                });
                res.json({
                    _id: findUser === null || findUser === void 0 ? void 0 : findUser._id,
                    firstname: findUser === null || findUser === void 0 ? void 0 : findUser.firstname,
                    lastname: findUser === null || findUser === void 0 ? void 0 : findUser.lastname,
                    email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
                    mobile: findUser === null || findUser === void 0 ? void 0 : findUser.mobile,
                    token: generateToken(findUser === null || findUser === void 0 ? void 0 : findUser._id),
                });
                return [3 /*break*/, 7];
            case 6: throw new Error("Invalid Credentials.");
            case 7: return [2 /*return*/];
        }
    });
}); });
// Admin Login
// Login User
var loginAdmin = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, findAdmin, _b, refreshToken, updateuser;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                findAdmin = _c.sent();
                if (findAdmin.role !== 'admin')
                    throw new Error("Not Authorised.");
                _b = findAdmin;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, findAdmin.isPasswordMatched(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (!_b) return [3 /*break*/, 6];
                return [4 /*yield*/, generateRefreshToken(findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin._id)];
            case 4:
                refreshToken = _c.sent();
                return [4 /*yield*/, User.findByIdAndUpdate(findAdmin.id, {
                        refreshToken: refreshToken,
                    }, { new: true })];
            case 5:
                updateuser = _c.sent();
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000,
                });
                res.json({
                    _id: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin._id,
                    firstname: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.firstname,
                    lastname: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.lastname,
                    email: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.email,
                    mobile: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.mobile,
                    token: generateToken(findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin._id),
                });
                return [3 /*break*/, 7];
            case 6: throw new Error("Invalid Credentials.");
            case 7: return [2 /*return*/];
        }
    });
}); });
// Update a user
var updatedUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, updatedUser_1, error_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findByIdAndUpdate(_id, {
                        firstname: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstname,
                        lastname: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastname,
                        email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email,
                        mobile: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.mobile,
                    }, {
                        new: true,
                    })];
            case 2:
                updatedUser_1 = _e.sent();
                res.json(updatedUser_1);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _e.sent();
                throw new Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Save User Address
var saveAddress = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, updatedUser_2, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findByIdAndUpdate(_id, {
                        address: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.address,
                    }, {
                        new: true,
                    })];
            case 2:
                updatedUser_2 = _b.sent();
                res.json(updatedUser_2);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                throw new Error(error_2);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get all users
var getallUsers = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var getUsers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.find()];
            case 1:
                getUsers = _a.sent();
                res.json(getUsers);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                throw new Error(error_3);
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get a user
var getUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, getUser_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findById(id)];
            case 2:
                getUser_1 = _a.sent();
                res.json({
                    getUser: getUser_1,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                throw new Error(error_4);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Handle refresh token
var handleRefreshToken = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cookie, refreshToken, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookie = req.cookies;
                // console.log(cookie);
                if (!cookie.refreshToken)
                    throw new Error("No refresh token in Cookies.");
                refreshToken = cookie.refreshToken;
                return [4 /*yield*/, User.findOne({ refreshToken: refreshToken })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("No refresh token in db or not matched.");
                jwt.verify(refreshToken, process.env.JWT_SECRET, function (err, decoded) {
                    if (err || user.id !== decoded.id) {
                        throw new Error("There is something wrong with refresh token.");
                    }
                    var accessToken = generateToken(user === null || user === void 0 ? void 0 : user.id);
                    res.json({ accessToken: accessToken });
                });
                return [2 /*return*/];
        }
    });
}); });
// Logout User
var logoutUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cookie, refreshToken, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookie = req.cookies;
                if (!cookie.refreshToken)
                    throw new Error("No refresh token in Cookies.");
                refreshToken = cookie.refreshToken;
                return [4 /*yield*/, User.findOne({ refreshToken: refreshToken })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.clearCookie("refreshToken", {
                        httpOnly: true,
                        secure: true,
                    });
                    return [2 /*return*/, res.sendStatus(204)]; // Forbidden
                }
                return [4 /*yield*/, User.findOneAndUpdate(refreshToken, {
                        refreshToken: "",
                    })];
            case 2:
                _a.sent();
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                });
                res.sendStatus(204); // Forbidden
                return [2 /*return*/];
        }
    });
}); });
// Delete a user
var deleteUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, deleteUser_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findByIdAndDelete(id)];
            case 2:
                deleteUser_1 = _a.sent();
                res.json({
                    deleteUser: deleteUser_1,
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                throw new Error(error_5);
            case 4: return [2 /*return*/];
        }
    });
}); });
var blockUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, unblock;
    return __generator(this, function (_a) {
        id = req.params.id;
        validateMongoDbId(id);
        try {
            unblock = User.findByIdAndUpdate(id, {
                isBlocked: true,
            }, {
                new: true,
            });
            res.json({
                message: "User Blocked",
            });
        }
        catch (error) {
            throw new Error(error);
        }
        return [2 /*return*/];
    });
}); });
var unblockUser = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, unblock;
    return __generator(this, function (_a) {
        id = req.params.id;
        validateMongoDbId(id);
        try {
            unblock = User.findByIdAndUpdate(id, {
                isBlocked: false,
            }, {
                new: true,
            });
            res.json({
                message: "User UnBlocked",
            });
        }
        catch (error) {
            throw new Error(error);
        }
        return [2 /*return*/];
    });
}); });
// Update a user password
var updatePassword = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, password, user, updatedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                password = req.body.password;
                validateMongoDbId(_id);
                return [4 /*yield*/, User.findById(_id)];
            case 1:
                user = _a.sent();
                if (!password) return [3 /*break*/, 3];
                user.password = password;
                return [4 /*yield*/, user.save()];
            case 2:
                updatedPassword = _a.sent();
                res.json(updatedPassword);
                return [3 /*break*/, 4];
            case 3:
                res.json(user);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// Forgot Password Token
var forgotPasswordToken = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, user, token, resetURL, data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("User not found with this email address");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, user.createPasswordResetToken()];
            case 3:
                token = _a.sent();
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                resetURL = "Hi, Please follow this link to reset your password. \
        This link is valid for 10 minutes from now.\
        <a href=`http://localhost:5000/api/user/reset-password/${token}`> Click Here </a>";
                data = {
                    to: email,
                    text: "Hey User",
                    subject: "Forgot Password Link",
                    htm: resetURL,
                };
                console.log(data.to);
                sendEmail(data);
                res.json(token);
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                throw new Error("not working", error_6);
            case 6: return [2 /*return*/];
        }
    });
}); });
// Reset Password
var resetPassword = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var password, token, hashedToken, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                token = req.params.token;
                hashedToken = crypto.createHash("sha256").update(token).digest('hex');
                return [4 /*yield*/, User.findOne({
                        passwordResetToken: hashedToken,
                        passwordResetExpires: { $gt: Date.now() },
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("Token Expired. Please try again later.");
                user.password = password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
// Get wishlist
var getWishList = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, findUser, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findById(_id).populate('wishlist')];
            case 2:
                findUser = _a.sent();
                res.json(findUser);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                throw new Error(error_7);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Add User cart
var userCart = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cart, _id, products, user, alreadyExistCart, i, object, getPrice, cartTotal, i, newCart, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cart = req.body.cart;
                _id = req.user._id;
                // console.log( cart );
                // console.log(_id);
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                products = [];
                return [4 /*yield*/, User.findById(_id)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, Cart.findOne({ orderby: user._id })];
            case 3:
                alreadyExistCart = _a.sent();
                if (alreadyExistCart) {
                    alreadyExistCart.remove();
                }
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < cart.length)) return [3 /*break*/, 7];
                object = {};
                object.product = cart[i]._id;
                object.count = cart[i].count;
                object.color = cart[i].color;
                return [4 /*yield*/, Product.findById(cart[i]._id).select("price").exec()];
            case 5:
                getPrice = _a.sent();
                object.price = getPrice.price;
                products.push(object);
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                console.log(products);
                cartTotal = 0;
                for (i = 0; i < products.length; i++) {
                    cartTotal += products[i].price * products[i].count;
                }
                return [4 /*yield*/, new Cart({
                        products: products,
                        cartTotal: cartTotal,
                        orderby: user === null || user === void 0 ? void 0 : user._id,
                    }).save()];
            case 8:
                newCart = _a.sent();
                res.json(newCart);
                return [3 /*break*/, 10];
            case 9:
                error_8 = _a.sent();
                throw new Error(error_8);
            case 10: return [2 /*return*/];
        }
    });
}); });
// Get User Cart
var getUserCart = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, cart, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Cart.findOne({ orderby: _id }).populate("products.product")];
            case 2:
                cart = _a.sent();
                res.json(cart);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                throw new Error(error_9);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Empty Cart
var emptyCart = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, user, cart, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findOne({ _id: _id })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, Cart.findOneAndRemove({ orderby: user._id })];
            case 3:
                cart = _a.sent();
                res.json(cart);
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                throw new Error(error_10);
            case 5: return [2 /*return*/];
        }
    });
}); });
// Coupon Added
var applyCoupon = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, coupon, validCoupon, user, _a, products, cartTotal, totalAfterDiscount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                coupon = req.body.coupon;
                return [4 /*yield*/, Coupon.findOne({ name: coupon })];
            case 1:
                validCoupon = _b.sent();
                // console.log(validCoupon);
                if (validCoupon === null) {
                    throw new Error("Invalid Coupon");
                }
                return [4 /*yield*/, User.findOne({ _id: _id })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, Cart.findOne({
                        orderby: user._id,
                    }).populate("products.product")];
            case 3:
                _a = _b.sent(), products = _a.products, cartTotal = _a.cartTotal;
                totalAfterDiscount = (cartTotal - (cartTotal + validCoupon.discount) / 100).toFixed(2);
                return [4 /*yield*/, Cart.findOneAndUpdate({ orderby: user._id }, { totalAfterDiscount: totalAfterDiscount }, { new: true })];
            case 4:
                _b.sent();
                res.json(totalAfterDiscount);
                return [2 /*return*/];
        }
    });
}); });
// Create Order
var createOrder = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, COD, couponApplied, _id, user, userCart_1, finalAmount, newOrder, update, updated, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, COD = _a.COD, couponApplied = _a.couponApplied;
                _id = req.user._id;
                validateMongoDbId(_id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!COD)
                    throw new Error("Create cash order failed");
                return [4 /*yield*/, User.findById(_id)];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, Cart.findOne({ orderby: user._id })];
            case 3:
                userCart_1 = _b.sent();
                finalAmount = 0;
                if (couponApplied && userCart_1.totalAfterDiscount) {
                    finalAmount = userCart_1.totalAfterDiscount;
                }
                else {
                    finalAmount = userCart_1.cartTotal;
                }
                return [4 /*yield*/, new Order({
                        products: userCart_1.products,
                        paymentIntent: {
                            id: uniqid(),
                            method: "COD",
                            amount: finalAmount,
                            status: "Cash on Delivery",
                            createdAt: Date.now(),
                            currency: "usd",
                        },
                        orderby: user._id,
                        orderStatus: "Cash on Delivery",
                    }).save()];
            case 4:
                newOrder = _b.sent();
                update = userCart_1.products.map(function (item) {
                    return {
                        updateOne: {
                            filter: { _id: item.product._id },
                            update: { $inc: { quantity: -item.count, sold: +item.count } },
                        },
                    };
                });
                return [4 /*yield*/, Product.bulkWrite(update, {})];
            case 5:
                updated = _b.sent();
                res.json({ message: "success" });
                return [3 /*break*/, 7];
            case 6:
                error_11 = _b.sent();
                throw new Error(error_11);
            case 7: return [2 /*return*/];
        }
    });
}); });
// Get Orders
var getOrders = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, userOrders, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Order.findOne({ orderby: _id })
                        .populate("products.product")
                        .exec()];
            case 2:
                userOrders = _a.sent();
                res.json(userOrders);
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                throw new Error(error_12);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Update Order
var updateOrderStatus = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var status, id, updateOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.body.status;
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Order.findByIdAndUpdate(id, {
                        orderStatus: status,
                        paymentIntent: {
                            status: status,
                        },
                    }, { new: true })];
            case 2:
                updateOrder = _a.sent();
                res.json(updateOrder);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                throw new Error(error);
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = {
    createUser: createUser,
    loginUserCtrl: loginUserCtrl,
    getallUsers: getallUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    updatedUser: updatedUser,
    blockUser: blockUser,
    unblockUser: unblockUser,
    handleRefreshToken: handleRefreshToken,
    logoutUser: logoutUser,
    updatePassword: updatePassword,
    forgotPasswordToken: forgotPasswordToken,
    resetPassword: resetPassword,
    loginAdmin: loginAdmin,
    getWishList: getWishList,
    saveAddress: saveAddress,
    userCart: userCart,
    getUserCart: getUserCart,
    emptyCart: emptyCart,
    applyCoupon: applyCoupon,
    createOrder: createOrder,
    getOrders: getOrders,
    updateOrderStatus: updateOrderStatus,
};
