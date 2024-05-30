import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    searchId:{
        type:String,
        required:true,
         
    },
    title:{
        type:String,
        required:true,
    },
    image:{
        type:[String],
        required:false
    },
    analyzedInstructions:{
        type:String,
        required:false,
    },
    ingredient:{
        type:String,
        required:false,
    },
    equipments:{
        type:String,
        required:false,
    },
    readyInMinutes:{
        type:Number,
        required:false,
    },
    complexity:{
        type:String,
        required:false,
    },
    healthScore:{
        type:String,
        required:false,
    },
    food_type:{
        type:String,
        required:false,
    },
    sourceName:{
        type:String,
        required:false,
    },
    spoonacularScore:{
        type:String,
        required:false,
    },
    servings:{
        type:String,
        required:false,
    },
    pricePerServing:{
        type:String,
        required:false,
    }

},{
    timestamps:true
});
export default mongoose.model("Saves",GigSchema)