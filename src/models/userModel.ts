import mongoose from 'mongoose'; // Erase if already required
import bcrypt from 'bcrypt';
import crypto from 'crypto';


interface cartObject{
    _id:string | mongoose.ObjectId
    count: number
    color: string
}

interface wishlistObject{
    _id:string | mongoose.ObjectId
}

export interface IUser extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    password: string;
    role?: string
    isBlocked?: string
    cart?: cartObject[]
    address?: string
    wishlist?: wishlistObject[]
    refreshToken?: String | Date
    passwordChangedAt: String | Date
    passwordResetToken?: String | Date
    passwordResetExpires: (String | number) | Date
    timestamp: String | Date
}


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: "user",
    },
    isBlocked: {
        type:Boolean,
        default:false,
    },
    cart: {
        type: Array,
        default: [],
    },
    address: {
        type: String,
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
 {
    timestamps: true,
});



userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// userSchema.methods.createPasswordResetToken = async function () {
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 mins
//     return resetToken;
// };


//Export the model
export default mongoose.model<IUser>('User', userSchema);
