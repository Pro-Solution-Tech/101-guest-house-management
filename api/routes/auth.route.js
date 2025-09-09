import express from "express";
import {
  signin,
  signup,
  signout,
  checkUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
// Backend: routes/auth.js
router.post("/verify", verifyToken, checkUser);
export default router;
