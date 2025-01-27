import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import path from "path"

dotenv.config()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo db is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const _dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.listen(5005, () => {
  console.log("Server is running in port 5005!!")
})
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)

app.use(express.static(path.join(_dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal error"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
