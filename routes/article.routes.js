import { Router } from "express";
import * as articleController from "../controllers/article.controller.js";
import * as uploadController from "../controllers/upload.controller.js";
const router = Router();
import multer from "multer";
const upload = multer();

router.get("/", articleController.readArticle);
router.get("/:id", articleController.articleInfo);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

//genre

router.post("/genre", articleController.getArticleByGenre);

//comments
router.patch("/comment-article/:id", articleController.commentArticle);
router.patch("/edit-comment-article/:id", articleController.editCommentArticle);
router.patch(
  "/delete-comment-article/:id",
  articleController.deleteCommentArticle
);

//search
router.get("/search/:id", articleController.searchbar);

//notes
router.get("/user-note/:id", articleController.getUserNote);
router.get("/user-comment/:id", articleController.getUserComment);
router.patch("/note-article/:id", articleController.noteArticle);
router.patch("/edit-note-article/:id", articleController.editNoteArticle);
router.patch("/delete-note-article/:id", articleController.deleteNoteArticle);
router.get("/note-average/:id", articleController.noteAverage);

//uploads
router.post(
  "/uploadArticlePic",
  upload.single("file"),
  uploadController.uploadArticlePic
);

export default router;
