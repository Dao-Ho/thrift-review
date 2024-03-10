import Connection from "../db/connections.js";
import mongoose from "mongoose";
import Review from "../models/review.js";

export default class ReviewsAccessor {
  async getReviewsByName(reviewTitle) {
    await Connection.open("home");
    const reviewFromDatabase = await Review.findOne({ title: reviewTitle });
    return reviewFromDatabase; 
    }

    static async getAllReviews() {
      await Connection.open("home");
      const allReviews = await Review.find({});
      return allReviews;
    }
  
    static async postReviews(reviewDoc) {
      Review.create(reviewDoc);
    }
}
