import { Post } from "../../models/Post"

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.fetchAll()
    res.json(posts)
  } catch (e) {
    next(e)
  }
}

export const addPost = async (req, res, next) => {
  if (!req.body.isEmpty) {
    try {
      const { title, content } = req.body
      await Post.forge({ title, content }).save()
    } catch (e) {
      next(e)
    }
    res.status(200).send("added")
  }
}

export const updatePost = async (req, res, next) => {
  if (!req.body.isEmpty) {
    try {
      const { title, content } = req.body
      await Post.where({ id: req.params.id }).save({ title, content }, { patch: true })
    } catch (e) {
      next(e)
    }
    res.status(200).send("updated")
  }
}

export const deletePost = async (req, res, next) => {
  try {
    await Post.where({ id: req.params.id }).destroy()
  } catch (e) {
    next(e)
  }
  res.status(200).send("deleted")
}
