import { Router } from "express";
import multer from "multer";
import { getUserProfile, setUserProfile } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

/***
 * GET | POST Request Headers:
 * Authorization: Bearer <Token>
 * 
 */
router.get("/profile", authMiddleware, getUserProfile);
router.post("/profile", authMiddleware, upload.single("avatar"), setUserProfile);

export default router;
