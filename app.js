import express from "express";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/jwtVerify";
import posts from "./routes/posts";
import auth from "./routes/auth";
import user from "./routes/user";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["*", "http://localhost:8080"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use("/auth", auth);
app.use("/posts", verifyToken, posts);
app.use("/users", verifyToken, user);
app.use((err, req, res, next) => {
  // res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
