import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
 username:{
    type:String,
    required:true,
    unique:true,
 },
 lastname:{
    type:String,
    required:false,
 },
 email:{
    type:String,
    required:true,
 },
 password:{
    type:String,
    required:true,
    unique:true,
 },
 image:{
    type:[String],
    required:false,
 },
 country:{
    type:String,
    required:false,
 },
 mobile_number:{
    type:Number,
    required:false,
 },
 state:{
    type:String,
    required:false,
 }
},{
    timestamps:true
});
export default mongoose.model("User",userSchema)