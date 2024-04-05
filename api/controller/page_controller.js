import path from "path";
import { v4 as uuidv4 } from 'uuid';
import ReviewsAccessor from "../db_accessors/reviews.accessor.js";

class PageController {



  static async getPostPage(req, res) {
    const reviews = await ReviewsAccessor.getAllReviews();
    res.render("post", { reviews });
  }

  static async getHomePage(req, res) {
    const reviews = await ReviewsAccessor.getAllReviews();
    res.render("reviews", { reviews });
  }

  static getCSS(req, res) {
    res.sendFile(path.resolve() + `/public/css/homePageStyle.css`);
  }

  // static async getReviews(req, res) {
  //   const reviews = await ReviewsAccessor.getAllReviews();
  //   res.render("reviews", { reviews });
  // }

  static async postReviews(req, res) {
    const reviewToPost = {
      id: uuidv4(),
      title: req.body.title,
      rating: req.body.rating,
      review: req.body.review,
    };

    ReviewsAccessor.postReviews(reviewToPost);

    res.redirect("/search?search=");
  }
}

export default PageController;