import { Router } from "express";
import multer from "multer";
import * as authController from "../controllers/auth.controller.js";
import * as userController from "../controllers/user.controller.js";
import * as uploadController from "../controllers/upload.controller.js";
const router = Router();
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

//user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

export default router;
