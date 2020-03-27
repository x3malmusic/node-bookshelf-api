import {
  getPosts,
  addPost,
  updatePost,
  deletePost
} from "../controllers/postsController";
import route from "express-promise-router";
const router = route();

router.get("/:userId", getPosts);
router.post("/:userId", addPost);
router.put("/:id", updatePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
