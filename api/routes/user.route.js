import express from "express"
import {
  test,
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js"
import { verfiyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.get("/test", test)
router.put("/update/:userId", verfiyToken, updateUser)
router.delete("/delete/:userId", verfiyToken, deleteUser)

router.post("/signout", signout)
export default router
