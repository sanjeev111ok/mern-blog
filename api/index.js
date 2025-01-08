import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"

dotenv.config()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo db is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()
app.use(express.json())
app.use(cookieParser())

app.listen(5005, () => {
  console.log("Server is running in port 3000!!")
})
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal error"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
