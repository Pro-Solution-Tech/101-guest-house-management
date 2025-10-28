import express from "express";
const router = express.Router();
import {
  validateContactForm,
  handleContactSubmission,
} from "../controllers/contact.controller.js";

router.post("/email", validateContactForm, handleContactSubmission);
export default router;
