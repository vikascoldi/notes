import type { Request, Response } from "express";
import note from "../model/note.model.js";

export const addNotes = async (req: Request, res: Response): Promise<void> => {
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

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user?._id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const notes = await note.find({ userId: user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      // notes:notes.sort((a,b)=>b.createdAt - a.createdAt);
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// delete note
export const deleteNotes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.user;

    if (!user?._id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const deletedNote = await note.findOneAndDelete({
      _id: req.params.id,
      userId: user._id,
    });

    if (!deletedNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// edit note
export const editNotes = async (req: Request, res: Response): Promise<void> => {
  const noteId = req.params.id;

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      success: false,
      message: "Request body is required",
    });
    return;
  }
  const { title, content, tags, isPinned } = req.body;

  try {
    const user = req.user;

    // Validate request body
    if (
      title === undefined &&
      content === undefined &&
      tags === undefined &&
      isPinned === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "No changes provided",
      });
      return;
    }

    console.log("Note ID:", noteId);
    console.log("Logged-in User ID:", user._id);
    // Find note belonging to the logged-in user
    const notes = await note.findOne({
      _id: noteId,
      userId: user._id,
    });
    console.log("Found Note:", notes);

    if (!notes) {
      res.status(404).json({
        success: false,
        message: "Note not found",
        error: error.message,
      });
      return;
    }

    // Update provided fields
    if (title !== undefined) notes.title = title;
    if (content !== undefined) notes.content = content;
    if (tags !== undefined) notes.tags = tags;
    if (isPinned !== undefined) notes.isPinned = isPinned;

    await notes.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      notes,
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
 
// edit pinned or update 
export const updateIsPinned = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;

    const user = req.user;

    if (!user?._id) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const notes = await note.findOne({ _id: noteId, userId: user._id });
    if (!notes) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    if (isPinned !== undefined) notes.isPinned = isPinned;

  if (typeof isPinned !== "boolean") {
  res.status(400).json({
    success: false,
    message: "isPinned must be a boolean",
  });
  return;
}

    await notes.save();

    res.status(200).json({
      success: true,
      message: "IsPinned updated successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
