import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routers.js";
import bodyParser from "body-parser";
import ReviewsAccessor from "./db_accessors/reviews.accessor.js";

export var searchWord = "";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/search", async (req, res) => {
  try {
    const currIndex = 0;
    const reviews = await ReviewsAccessor.getAllReviews();
    let searchTerm = req.query.search.toLowerCase();
    searchWord = searchTerm;
    //filters out reviews to only include searchTerm
    const matchingReviews = reviews.filter((review) =>
      review.title.toLowerCase().includes(searchTerm)
    );

    res.render("reviews", { reviews: matchingReviews, searchWord: searchTerm, currIndex: currIndex});
    //catch error if needed
  } catch (error) {
    console.error(error);
    res.status(500).send("Error While Searching");
  }
});

app.get("/getReviewContent", async (req, res) => {
  const reviews = await ReviewsAccessor.getAllReviews();
  const index = req.query.index;
  const reviewContent = reviews[index] ? reviews[index].review : " ";
  const reviewTitle = reviews[index] ? reviews[index].title : " ";
  const reviewRating = reviews[index] ? reviews[index].rating : " ";
  res.json({
    reviewContent: reviewContent,
    reviewTitle: reviewTitle,
    reviewRating: reviewRating,
  });
});

app.post("/delete", async (req, res) => {
    try {
        const reviewIndex = req.body.review;
        console.log("reviewIndex to delete: ", reviewIndex);
        await ReviewsAccessor.deleteReview(reviewIndex);
        res.status(200).send('Review deleted successfully');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error while deleting review');
    }
});


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));

app.use("/", router);

export default app;
