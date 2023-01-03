import mongoose from 'mongoose'; // Erase if already required


export interface IBrand extends mongoose.Document {
    title: string;
    timestamp: String | Date;
}


// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema({
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
export default mongoose.model<IBrand>('Brand', brandSchema);