import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing",
      });
      return;
    }

    const secretKey = process.env.ACCESS_TOKEN;

    if (!secretKey) {
      res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      });
      return;
    }

    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === "string") {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    // DEBUG: Check decoded token
    console.log("Decoded JWT:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authenticateToken;