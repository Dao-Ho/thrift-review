import express from "express";
import PageController from "../controller/page_controller.js";
import path from "path";

const router = express.Router();


router.route("/public/css/:style.css").get((req, res) => {
  res.sendFile(path.resolve() + `/public/css/${req.params.style}.css`);
});

router.route("/").get(PageController.getHomePage).post(PageController.postReviews);

router.route("/post").get(PageController.getPostPage).post(PageController.postReviews);

export default router;