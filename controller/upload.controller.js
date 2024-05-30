import uploadModel from "../models/upload.model.js";
import createError from "./utils/createError.js";

export const createUpload=async(req,res,next)=>{
    console.log("getting into create upload");
    console.log("creart Upload   :   ",req.userId);
    const newUpload=new uploadModel({
        userId:req.userId,
        ...req.body,
    });
    try{
        const savedUpload=await newUpload.save();
        res.status(201).json(savedUpload)
        console.log("Upload is done")
    }catch(err){
        console.log(err);
        next(err)
    }
};

export const deleteUpload=async(req,res,next)=>{
   try{
    const upl=await uploadModel.findById(req.params.id);
    if(upl.userId!==req.userId)
    return next(createError(403,"You can delete only your upload"));


    await uploadModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Upload has been deleted ")
   }catch(err){
    next(err)
   }
}

export const getUpload=async(req,res,next)=>{
    try{
        //console.log("getUpload   :   ",req.userId);
        
    const upl=await uploadModel.find();
    if(!upl)
    {
        next(createError(404,"Upload not found"))
    }
    res.status(200).send(upl)
   }catch(err){
    next(err)
   }
}

export const getUploads=async   (req,res,next)=>{
    console.log("ID    :   ",req.userId);
    const filters={
        userId:req.userId
    }
    try{
        const upl=await uploadModel.find(filters);
        if(!upl)
        {
            next(createError(404,"NO Uploads"))
        }
        res.status(200).send(upl)
       }catch(err){
        next(err)
       }
}
