import { Router } from "express";
import * as genreController from "../controllers/genre.controller.js";
const router = Router();

router.post("/", genreController.createGenre);
router.put("/:id", genreController.updateGenre);
router.delete("/:id", genreController.deleteGenre);
router.get("/", genreController.getGenre);

export default router;
