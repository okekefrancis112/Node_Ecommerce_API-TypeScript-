import mongoose = require('mongoose');


export const validateMongoDbId = (id:string) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error ("This is not valid or not Found.");
};
