var mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        // type:mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: "Category",
        required: true,
    },
    brand: {
        type: String,
        // enum: ["Apple", "Samsung", "Lenovo"]
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        // select: false,
    },
    sold: {
        type: Number,
        default: 0,
        // select: false,
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        // enum: ["Black", "Brown", "Red"],
        required: true,
    },
    ratings: [
        {
            star: Number,
            comment: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating: {
        types: String,
        default: 0,
    },
}, { timestamps: true });
//Export the model
module.exports = mongoose.model('Product', productSchema);
