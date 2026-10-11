import express, { type Request, type Response } from "express";

import dotenv from "dotenv";
import cors from "cors";
import ConnecteDb from "./config/db.js";
import authRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Notes Backend Working");
});


// all routes here 
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 5000;

const serverStart = async (): Promise<void> => {
  try {
     await ConnecteDb();
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit();
  }
};

serverStart();
