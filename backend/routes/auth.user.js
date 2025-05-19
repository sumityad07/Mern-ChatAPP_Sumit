import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controller/user.js"
import { protectRoute } from "../middleware/auth.js"

const router = express()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.put("/updateProfile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)


export default router