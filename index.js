import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import app from "./api/app.js";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(helmet());
app.use(express.json());

const router = express.Router();

router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/index.html");
});

router.route('/public/css/:style.css').get((req, res) => {
  res.sendFile(path.resolve() + `/public/css/${req.params.style}.css`);
});

app.use("/", router);

const HOSTNAME = "localhost";
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
