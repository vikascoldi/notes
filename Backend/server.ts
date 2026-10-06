import express, {type Request, type Response} from "express";

import dotenv from "dotenv";
import cors from "cors"
dotenv.config();


const app = express();

app.use(express.json());

app.use(
    cors({
        origin:"*",
    })
)

app.get("/",(req:Request,res:Response)=>{
     res.send("Notes Backend Working");
})



const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`Server is Running on ${PORT}`)
});


