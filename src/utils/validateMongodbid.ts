import mongoose from 'mongoose';


export const validateMongoDbId = (id:string) => {
    console.log(id);
    
    const isValid:any = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error ("This is not valid or not Found.");
};
