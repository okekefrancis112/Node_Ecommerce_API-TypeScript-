import mongoose from 'mongoose'; // Erase if already required


interface ratingObject{
    star:number
    comment: string
    postedBy: string | mongoose.ObjectId
}

export interface IProduct extends mongoose.Document {
    title: string;
    slug: string;
    description: string;
    price: string;
    category: string;
    brand: string;
    quantity: number;
    sold?: number;
    images?: [];
    color: string;
    ratings?: ratingObject[];
    totalrating?: string;
    timestamp: String | Date;
}



// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    quantity: {
        type:Number,
        required:true,
    },
    sold:{
        type:Number,
        default:0,
    },
    images:{
        type:Array,
    },
    color:{
        type:String,
        required:true,
    },
    ratings: [
        {
            star:Number,
            comment:String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating: {
        types: String,
        default: 0,
    },
    },
{ timestamps: true },
);

//Export the model
export default mongoose.model<IProduct>('Product', productSchema);