import express from "express";
import { getByIdUser, loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/:id",getByIdUser);



export default router;
