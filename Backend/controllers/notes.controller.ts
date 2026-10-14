
import type { Request, Response } from "express";
import note from "../model/note.model.js";


export const Notes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, tags } = req.body;

    // Get user from authenticated request
    const user = req.user;

console.log("Authenticated user:", user);
console.log("User ID:", user?._id);


   if (!user?._id) {
  res.status(401).json({
    success: false,
    message: "User ID not found in token",
  });
  return;
}

    if (!title) {
      res.status(400).json({
        message: "Title is required",
        success: false,
      });
      return;
    }

    if (!content) {
      res.status(400).json({
        message: "Content is required",
        success: false,
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        message: "Unauthorized: User not found",
        success: false,
      });
      return;
    }

    // Create a note
    const notes = await note.create({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    res.status(201).json({
      message: "Note added successfully",
      success: true,
      notes,
    });
  } catch (error: unknown) {
    console.error("Internal server error:", error);

    res.status(500).json({
      message: "Internal server issue",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

