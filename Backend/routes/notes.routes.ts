import express from "express";
import authenticateToken from "../utilities.js";
import { Notes } from "../controllers/notes.controller.js";

const router = express.Router();
//  main routes  /api/notes
router.post("/add-note",authenticateToken,Notes);

export default router;