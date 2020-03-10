import {
  getPosts,
  addPost,
  updatePost,
  deletePost
} from "./controllers/postsController";
import route from "express-promise-router";
const router = route();

router.get("/posts", getPosts);
router.post("/posts", addPost);
router.put("/posts/:id", updatePost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
