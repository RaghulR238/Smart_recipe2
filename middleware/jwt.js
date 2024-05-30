import  jwt  from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
   
    const token=req.query.accessToken;
    console.log("token   :   ",token);
    console.log(req.query);
    if(!token)
    return res.status(401).send("You are not authenticated")

// jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
//         if(err) return res.status(401).send("token is not valid")
//         req.userId=payload.id;
//         //req.isSeller=payload.isSeller;
//         console.log("Finish verification")
//         next()
//     })
next();
}
