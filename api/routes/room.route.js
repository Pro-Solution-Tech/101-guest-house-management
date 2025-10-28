import express from "express";
const router = express.Router();
import {
  createRoom,
  deleteRoom,
  updateRoom,
  getRoom,
  getAllRooms,
} from "../controllers/room.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createRoom);
router.delete("/delete/:id", verifyToken, deleteRoom);
router.post("/update/:id", verifyToken, updateRoom);
router.get("/get/:id", getRoom);
router.get("/get-all-rooms", getAllRooms);
export default router;
