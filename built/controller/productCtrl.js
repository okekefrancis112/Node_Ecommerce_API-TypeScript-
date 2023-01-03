var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Product = require("../models/productModel");
var asyncHandler = require("express-async-handler");
var slugify = require("slugify");
var validateMongoDbId = require('../utils/validateMongodbid');
var User = require('../models/userModel');
var cloudinaryUploadImg = require("../utils/cloudinary");
// Create a new Product
var createProduct = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newProduct, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (req.body.title) {
                    req.body.slug = slugify(req.body.title);
                }
                return [4 /*yield*/, Product.create(req.body)];
            case 1:
                newProduct = _a.sent();
                res.json(newProduct);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update a product
var updateProduct = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, update, error_2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _id = String(req.params.id);
                validateMongoDbId(_id);
                _k.label = 1;
            case 1:
                _k.trys.push([1, 3, , 4]);
                if (req.body.title) {
                    req.body.slug = slugify(req.body.title);
                }
                return [4 /*yield*/, Product.findByIdAndUpdate(_id, {
                        title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
                        slug: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.slug,
                        category: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.category,
                        brand: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.brand,
                        description: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.description,
                        price: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.price,
                        quantity: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.quantity,
                        color: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.color,
                        wishlist: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.wishlist,
                    }, {
                        new: true,
                    })];
            case 2:
                update = _k.sent();
                res.json(update);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _k.sent();
                throw new Error(error_2);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete a product
var deleteProduct = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, deleteProduct_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Product.findOneAndDelete(id)];
            case 2:
                deleteProduct_1 = _a.sent();
                res.json(deleteProduct_1);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                throw new Error(error_3);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get Product
var getProduct = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, findProduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Product.findById(id)];
            case 2:
                findProduct = _a.sent();
                res.json(findProduct);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                throw new Error(error_4);
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get all products
var getAllProducts = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var queryObj_1, excludeFields, queryStr, query, sortBy, fields, page, limit, skip, productCount, product, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                queryObj_1 = __assign({}, req.query);
                excludeFields = ["page", "sort", "limit", "fields"];
                excludeFields.forEach(function (el) { return delete queryObj_1[el]; });
                queryStr = JSON.stringify(queryObj_1);
                queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) { return "$".concat(match); });
                query = Product.find(JSON.parse(queryStr));
                // Sorting products
                if (req.query.sort) {
                    sortBy = req.query.sort.split(",").split(" ");
                    query = query.sort(sortBy);
                }
                else {
                    query = query.sort("-createdAt");
                }
                //  Limiting product fields
                if (req.query.fields) {
                    fields = req.query.fields.split(",").split(" ");
                    query = query.select(fields);
                }
                else {
                    query = query.select("-__v");
                }
                page = req.query.page;
                limit = req.query.limit;
                skip = (page - 1) * limit;
                query = query.skip(skip).limit(limit);
                if (!req.query.page) return [3 /*break*/, 2];
                return [4 /*yield*/, Product.countDocuments()];
            case 1:
                productCount = _a.sent();
                if (skip >= productCount)
                    throw new Error("This page does not exists.");
                _a.label = 2;
            case 2:
                console.log(page, skip, limit);
                return [4 /*yield*/, query];
            case 3:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                throw new Error(error_5);
            case 5: return [2 /*return*/];
        }
    });
}); });
// Add to wishlist
var addToWishlist = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, prodId, user, alreadyAdded, user_1, user_2, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                prodId = req.body.prodId;
                validateMongoDbId(_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User.findById(_id)];
            case 2:
                user = _a.sent();
                alreadyAdded = user.wishlist.find(function (id) { return id.toString() === prodId; });
                if (!alreadyAdded) return [3 /*break*/, 4];
                return [4 /*yield*/, User.findByIdAndUpdate(_id, {
                        $pull: { wishlist: prodId },
                    }, {
                        new: true,
                    })];
            case 3:
                user_1 = _a.sent();
                console.log(user_1);
                res.json(user_1);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, User.findByIdAndUpdate(_id, {
                    $push: { wishlist: prodId },
                }, {
                    new: true,
                })];
            case 5:
                user_2 = _a.sent();
                console.log(user_2);
                res.json(user_2);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                throw new Error(error_6);
            case 8: return [2 /*return*/];
        }
    });
}); });
// Create and Update Rating
var rating = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _id, _a, star, prodId, comment, product, alreadyRated, updateRating, rateProduct, getAllRatings, totalRating, ratingsum, actualRating, finalproduct, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.user._id;
                validateMongoDbId(_id);
                _a = req.body, star = _a.star, prodId = _a.prodId, comment = _a.comment;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Product.findById(prodId)];
            case 2:
                product = _b.sent();
                alreadyRated = product.ratings.find(function (userId) { return userId.postedBy.toString() === _id.toString(); });
                if (!alreadyRated) return [3 /*break*/, 4];
                return [4 /*yield*/, Product.updateOne({
                        ratings: { $elemMatch: alreadyRated },
                    }, {
                        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                    }, {
                        new: true,
                    })];
            case 3:
                updateRating = _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, Product.findByIdAndUpdate(prodId, {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: _id,
                        },
                    },
                }, {
                    new: true,
                })];
            case 5:
                rateProduct = _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, Product.findById(prodId)];
            case 7:
                getAllRatings = _b.sent();
                totalRating = getAllRatings.ratings.length;
                ratingsum = getAllRatings.ratings
                    .map(function (item) { return item.star; })
                    .reduce(function (prev, curr) { return prev + curr; }, 0);
                actualRating = Math.round(ratingsum / totalRating);
                return [4 /*yield*/, Product.findByIdAndUpdate(prodId, {
                        totalrating: actualRating,
                    }, { new: true })];
            case 8:
                finalproduct = _b.sent();
                console.log(finalproduct);
                res.json(finalproduct);
                return [3 /*break*/, 10];
            case 9:
                error_7 = _b.sent();
                throw new Error(error_7);
            case 10: return [2 /*return*/];
        }
    });
}); });
// Upload Images
var uploadImages = asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, uploader, urls, files, _i, files_1, file, path, newpath, findProduct, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                validateMongoDbId(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                uploader = function (path) { return cloudinaryUploadImg(path, "images"); };
                urls = [];
                files = req.files;
                _i = 0, files_1 = files;
                _a.label = 2;
            case 2:
                if (!(_i < files_1.length)) return [3 /*break*/, 5];
                file = files_1[_i];
                path = file.path;
                console.log(path);
                return [4 /*yield*/, uploader(path)];
            case 3:
                newpath = _a.sent();
                console.log(newpath);
                urls.push(newpath);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, Product.findByIdAndUpdate(id, {
                    images: urls.map(function (file) {
                        return file;
                    }),
                }, {
                    new: true,
                })];
            case 6:
                findProduct = _a.sent();
                res.json(findProduct);
                return [3 /*break*/, 8];
            case 7:
                error_8 = _a.sent();
                throw new Error(error_8);
            case 8: return [2 /*return*/];
        }
    });
}); });
module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    getAllProducts: getAllProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    addToWishlist: addToWishlist,
    rating: rating,
    uploadImages: uploadImages,
};
