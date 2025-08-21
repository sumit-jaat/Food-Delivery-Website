import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";



// app config
const app = express()
const port = 8000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// routes
import { foodRouter } from "./routes/food.route.js";
import { userRouter } from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";


app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)

app.get("/",(req, res) => {
    res.send("API is working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// mongodb+srv://shivanshchaurasiya2004:shiv20042003@cluster0.rkxispa.mongodb.net/?