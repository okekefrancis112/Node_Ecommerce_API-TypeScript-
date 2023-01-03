
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


// let env = process.env.JWT_SECRET || ''
interface methods {
    id : String,
    env : string,
    expiresIn : Number
  }


const authMiddleware = asyncHandler( async (req:any, res:any, next:any) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers?.authorization?.split(" ")[1];
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>", token);
        try {
            if(token) {

                const decoded =  jwt.verify(token, process.env.JWT_SECRET || '') as methods;
                // console.log(decoded);
                const user = User.findById(decoded.id);
                const { id } = user
                // console.log(id);
                req.user = user;
                // console.log(req.user);
                // const { _id } = req.user
                // console.log(_id);

                next();
            }
        } catch (error) {
            throw new Error("Not Authorized token expired, Please log in again.");
        }
    } else {
        throw new Error("There is no token attached to header.");
    }
});


const isAdmin = asyncHandler(async (req:any, res:any, next:any) => {
    // console.log(req.user);
    const { email } = req.user;
    const adminUser:any = User.findOne({ email: email });
    if (adminUser.role !== 'admin') {
        throw new Error("You are not an admin.");

    } else {
        next();
    }
});

export  { authMiddleware, isAdmin }
