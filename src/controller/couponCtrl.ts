import { Request, Response } from "express";
import Coupon from "../models/couponModel";
import asyncHandler from "express-async-handler";
import {validateMongoDbId} from '../utils/validateMongodbid';


//  Create Coupon
const createCoupon = asyncHandler(async (req:Request, res:Response) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (err:any) {
        throw new Error(err);
    }
});


//  Get All Coupon
const getAllCoupons = asyncHandler(async (req:Request, res:Response) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (err:any) {
        throw new Error(err);
    }
});


//  Update Coupon
const updateCoupons = asyncHandler(async (req:Request, res:Response) => {
    const {id} = req.params;
    validateMongoDbId(id);
    console.log(id);
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body,
            {
                new: true,
            }
            );
        console.log(updatedCoupon?.name);
        res.json(updatedCoupon);
    } catch (err:any) {
        throw new Error(err);
    }
});


//  Deme Coupon
const deleteCoupons = asyncHandler(async (req:Request, res:any) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletedCoupon);
    } catch (err:any) {
        throw new Error(err);
    }
});

export { createCoupon, getAllCoupons, updateCoupons, deleteCoupons };