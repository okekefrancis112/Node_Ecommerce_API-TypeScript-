import mongoose from 'mongoose'; // Erase if already required



// interface orderStatus{
//         type: String,
//         default: "Not Processed",
//         enum: []
// }

interface productObject{
    product: string | mongoose.ObjectId
    count:number
    color: string
}

interface productInt{

}


export interface IOrder extends mongoose.Document {
    products: productObject[];
    paymentIntent: productInt;
    orderStatus: String;
    orderby?: string | mongoose.ObjectId;
    timestamp: String | Date;
}


// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
        },
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
        ],
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true,
});

//Export the model
export default mongoose.model<IOrder>('Order', orderSchema);