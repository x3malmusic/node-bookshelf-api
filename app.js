import express from "express";
import posts from "./routes/posts";
import auth from "./routes/auth";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use("", posts);
app.use("/auth", auth);
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
