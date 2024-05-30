import saves from "../models/saves.js";
import createError from "./utils/createError.js";

export const createSaves=async(req,res,next)=>{
    console.log("getting into create upload");
    console.log("creart Upload   :   ",req.query.userId);
    const newUpload=new saves({
        searchId:req.query.userId,
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

export const deleteSaves=async(req,res,next)=>{
    try{
     const upl=await saves.findById(req.params.id);
     if(upl.userId!==req.userId)
     return next(createError(403,"You can delete only your upload"));
 
 
     await uploadModel.findByIdAndDelete(req.params.id);
     res.status(200).send("Upload has been deleted ")
    }catch(err){
     next(err)
    }
 }
 
 
 export const getSaves=async   (req,res,next)=>{
     console.log("ID    :   ",req.query.userId);
     const filters=
     {
         searchId:req.query.userId
     }
     try {
        const gigs = await saves.aggregate([
            {
                $match: {
                    searchId: req.query.userId,
                },
            },
            {
                $group: {
                    _id: "$title", // Group by the 'title' field
                    doc: { $first: "$$ROOT" }, // Keep the first document encountered for each title
                },
            },
            {
                $replaceRoot: { newRoot: "$doc" }, // Replace the root with the original document
            },
        ]);

        if (!gigs || gigs.length === 0) {
            next(createError(404, "No Gigs"));
            return;
        }

        res.status(200).send(gigs);
    } catch (err) {
        next(err);
    }
    //  try{
    //      const upl=await saves.find(filters);
    //      console.log(upl);
    //      if(!upl)
    //      {
    //          next(createError(404,"NO Uploads"))
    //      }
    //      res.status(200).send(upl)
    //     }
    //     catch(err)
    //     {
    //      next(err)
    //     }
        // try {
        //     // Use distinct to get unique values for the 'title' field
        //     const uniqueTitles = await saves.distinct('title', filters);
    
        //     if (!uniqueTitles || uniqueTitles.length === 0) {
        //         next(createError(404, "No Gigs"));
        //         return;
        //     }
    
        //     // Now, use the unique titles to fetch the documents
        //     const gigs = await saves.find({ searchId: req.userId, title: { $in: uniqueTitles } });
    
        //     console.log(gigs);
    
        //     if (!gigs || gigs.length === 0) {
        //         next(createError(404, "No Gigs"));
        //         return;
        //     }
    
        //     res.status(200).send(gigs);
        // } catch (err) {
        //     next(err);
       // }
 }