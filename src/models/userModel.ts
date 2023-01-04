// import mongoose from 'mongoose'; // Erase if already required
import { Schema, Types, model, Document } from 'mongoose'; // Erase if already required
import bcrypt from 'bcrypt';
import crypto from 'crypto';


interface cartObject{
    _id:string | Types.ObjectId
    count: number
    color: string
}

interface wishlistObject{
    _id:string | Types.ObjectId
}

export interface IUser {
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
    refreshToken?: string | Date
    passwordChangedAt: string | Date
    passwordResetToken?: string | Date
    passwordResetExpires: (string | number) | Date
    timestamp: string | Date
}

// type iDocument = IUser & mongoose.Document;


// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>({
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
    wishlist: [{type: Schema.Types.ObjectId, ref: "Product" }],
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

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 mins
    return resetToken;
};

//Export the model
export default model<IUser>('User', userSchema);
