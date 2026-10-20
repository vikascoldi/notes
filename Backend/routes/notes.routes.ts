import express from "express";
import authenticateToken from "../utilities.js";
import { addNotes, deleteNotes, editNotes, getNotes } from "../controllers/notes.controller.js";

const router = express.Router();
//  main routes  /api/notes 
router.post("/add-note",authenticateToken,addNotes);  // create note
router.delete("/delete/:id",authenticateToken,deleteNotes);  // delete notes
router.get("/", authenticateToken, getNotes);   // get all notes
router.put("/edit-note/:id",authenticateToken,editNotes);  // update notes

export default router;