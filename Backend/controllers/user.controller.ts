import type { Request, Response } from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, email: string): string => {
  const secretKey = process.env.ACCESS_TOKEN;

  if (!secretKey) {
    throw new Error("ACCESS_TOKEN is not configured");
  }

  return jwt.sign(
    {
      _id: userId,
      email,
    },
    secretKey,
    { expiresIn: "1h" },
  );
};

// REGISTER USER
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const accessToken = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });
  } catch (error: unknown) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (!user.password) {
      res.status(500).json({
        success: false,
        message: "User password is not available",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const accessToken = generateToken(user._id.toString(), user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
      },
      AccessToken:accessToken,
    });
  } catch (error: unknown) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get user by id 
export const getByIdUser = async (req:Request,res:Response) =>{
  try {
    const userId = req.params.id; 

    const user = await User.findById(userId).select("-password")

    if(!user) {
      res.status(404).json({
        message:"User not found", 
      });
      return;
    }

    res.status(200).json({
      message:"User fetch successfully",
      user
    })



  } catch (error) {
    console.error("Error",error);
     
      res.status(500).json({
        message:"Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
         
      })
    
  };
}




