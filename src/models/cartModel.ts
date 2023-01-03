import mongoose from 'mongoose'; // Erase if already required



interface productObject{
    product: string | mongoose.ObjectId
    count:number
    color: string
    price: number
}

export interface ICart extends mongoose.Document {
    products?: productObject[];
    cartTotal?: number;
    totalAfterDiscount?: number;
    orderby?: string | mongoose.ObjectId;
    timestamp: String | Date;
}


// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
            price: Number,
        },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true,
});


//Export the model
export default mongoose.model<ICart>('Cart', cartSchema);