import { Request, Response } from 'express';
import Category from '../models/productCategoryModel';
import asyncHandler from "express-async-handler";
import {validateMongoDbId} from '../utils/validateMongodbid';


// Create Product Category
const createCategory = asyncHandler(async (req:Request, res:Response) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Update category
const updateCategory = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body,
            {
                new: true,
            });
        res.json(updatedCategory);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Delete category
const deleteCategory = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id)
        res.json(deletedCategory);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get Product Category
const getCategory = asyncHandler(async (req:Request, res:Response) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const get_a_Category = await Category.findById(id);
        res.json(get_a_Category);
    } catch (error:any) {
        throw new Error(error);
    }
});


// Get All Product Category
const getAllCategory = asyncHandler(async (req:Request, res:Response) => {
    try {
        const get_all_Category = await Category.find();
        res.json(get_all_Category);
    } catch (error:any) {
        throw new Error(error);
    }
});


export {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
};