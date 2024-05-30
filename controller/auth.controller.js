import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "./utils/createError.js";

export const register = async (req, res, next) => {
      console.log("mistake");
  //res.send("thanni can poda vanthen")
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created Successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("what is the error");
    //console.log(req);
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) return next(createError(404, "User Not Found"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        //isSeller:user.isSeller,
      },
      process.env.JWT_KEY
    );
    console.log("working ");
    const { password, ...info } = user._doc;
    
    const clientData={token,...info};
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(clientData);
  } catch (err) {
    console.log("efcef");
    res.status(500).send("something Wrong");
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the "accessToken" cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      domain: "localhost",
    });
    res.status(200).send("User has been logged out");
    // console.log("Logout ");
    // const t=null;
    // res
    //   .cookie("accessToken", t, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .send("logout using loopHOle");

    // Send a response indicating successful logout
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).send("Internal Server Error");
  }
};
