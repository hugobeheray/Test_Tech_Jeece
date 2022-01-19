import { Router } from "express";
const router = Router();
import * as passwordResetController from "../controllers/passwordReset.controller.js";

router.post("/", passwordResetController.sendPasswordReset);
router.post("/:userId/:token", passwordResetController.resetPassword);

export default router;
