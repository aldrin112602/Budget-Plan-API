import { Request, Response } from "express";
import userService from "../services/userService";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.body.userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const setUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await userService.setUserProfile(req.body, req.file);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getUserProfile, setUserProfile };