import express, { type Request, type Response } from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

  export const registerUser = async (req: Request, res: Response) => {
  try {
    const { FullName, email, password } = req.body;
    if (!FullName) {
      res.status(401).json({
        message: "Please enter fullname",
        success: false,
      });
      return;
    }
    if (!email) {
      res.status(401).json({
        message: "Please enter email",
        success: false,
      });
      return;
    }
    if (!password) {
      res.status(401).json({
        message: "Please enter passoword",
        success: false,
      });
      return;
    }
    const existUser = await User.findOne({ email: email.trim().toLowerCase(), });

    if (existUser) {
      res.status(409).json({
        message: "User already registered",
        success:false,
      });

       return
     
    }
      const hashPassoword = await  bcrypt.hash(password,12)
    // creat User 
     const user =  await User.create({
        fullName: FullName.trim(),
        email:email.trim().toLowerCase(),
        password:password,
     });

     res.status(200).json({
        message:"Account register successfully",
        user:{
            id:user._id,
            fullname:user.fullName,
            email:user.email,
        }
     })
  } catch (error) {
    console.error("Register error",error);
    res.status(500).json({
        message:"Internal server error",
        success:false,
        error:error.message,
    })
  }
};
