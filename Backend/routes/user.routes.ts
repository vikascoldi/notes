import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create-account", registerUser);

export default router;
