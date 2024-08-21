import { Router } from "express";
import multer from "multer";
import { getUserProfile, setUserProfile } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
const upload = multer();
const router = Router();

/***
 * GET Request Headers:
 * Authorization: Bearer <Token>
 * Content-Type: application/json
 */
router.get("/profile", authMiddleware, getUserProfile);
router.post(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  setUserProfile
);

export default router;
