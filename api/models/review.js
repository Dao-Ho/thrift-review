import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        id: {
            type: String,
            required: true, 
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        }
    },
    {
        collection: "reviews",
    });

    const db = mongoose.connection.useDb("reviews");
    const Review = db.model("Review", ReviewSchema);

    export default Review;