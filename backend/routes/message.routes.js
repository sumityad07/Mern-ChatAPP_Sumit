import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controller/message.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();  // Use Router(), not express()

router.get("/users", protectRoute, getUsersForSidebar);  // Add leading slash

router.post("/send/:id", protectRoute, sendMessage);  // Protect this route too if needed

router.get("/:id", protectRoute, getMessages);  // Protect this route too if needed

export default router;
