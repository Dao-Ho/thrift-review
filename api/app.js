import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routers.js";
import bodyParser from "body-parser";
import ReviewsAccessor from "./db_accessors/reviews.accessor.js";

export var searchWord = "";
const app = express();

app.set("view engine", "ejs");

app.get("/search", async (req, res) => {
    try {
        const reviews = await ReviewsAccessor.getAllReviews();
        let searchTerm = req.query.search.toLowerCase(); 
        searchWord = searchTerm;
        //filters out reviews to only include searchTerm
        const matchingReviews = reviews.filter((review) =>
            review.title.toLowerCase().includes(searchTerm)
        );
        
        res.render("reviews", { reviews: matchingReviews, searchWord: searchTerm});
        //catch error if needed
    } catch (error) {
        console.error(error);
        res.status(500).send("Error While Searching");
    }
});

app.get('/getReviewContent', async (req, res) => {
    const reviews = await ReviewsAccessor.getAllReviews();
    const index = req.query.index;
    const reviewContent = reviews[index] ? reviews[index].review : " ";
    const jsonPackedContent = JSON.stringify(reviewContent)
    res.json({ reviewContent: jsonPackedContent });
  });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

app.use("/", router);

export default app;
