import { Request, Response } from 'express';
import Brand from '../models/brandModel';
import asyncHandler from "express-async-handler";
import {validateMongoDbId} from '../utils/validateMongodbid';


// Create Product Brand
const createBrand = asyncHandler(async (req:Request, res:Response) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Update Brand
const updateBrand = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body,
            {
                new: true,
            });
        res.json(updatedBrand);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Delete Brand
const deleteBrand = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.json(deletedBrand);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get Product Brand
const getBrand = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const get_a_Brand = await Brand.findById(id);
        res.json(get_a_Brand);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get All Product Brand
const getAllBrand = asyncHandler(async (req:Request, res:Response) => {
    try {
        const get_all_Brand = await Brand.find();
        res.json(get_all_Brand);
    } catch (error:any) {
        throw new Error(error);
    }
});


export {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand
};