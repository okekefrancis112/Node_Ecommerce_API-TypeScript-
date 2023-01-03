import mongoose from 'mongoose'; // Erase if already required

export interface IProductCategory extends mongoose.Document {
    title: string;
    timestamp: String | Date;
}

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
}, {
    timestamps:true,
});

//Export the model
export default mongoose.model<IProductCategory>('Product_Category', productCategorySchema);

