import { Router } from "express"
import { getPosts, addPost, updatePost, deletePost } from "./postsController"

const router = new Router()

router.get("/posts", getPosts)
router.post("/posts", addPost)
router.put("/posts/:id",  updatePost)
router.patch("/posts/:id",  updatePost)
router.delete("/posts/:id", deletePost)

export default router
