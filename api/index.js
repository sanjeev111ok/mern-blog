import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/user.route.js"
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

app.listen(5005, () => {
  console.log("Server is running in port 3000!!")
})
app.use("/api/user", router)
