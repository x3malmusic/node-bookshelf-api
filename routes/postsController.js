import { Post } from "../models/Post"

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.fetchAll()
    return res.json(posts)
  } catch (e) {
    res.send(e.message)
  }
}

export const addPost = async (req, res) => {
  if (!req.body.isEmpty) {
    try {
      const { title, content } = req.body
      await Post.forge({ title, content }).save()
    } catch (e) {
      return res.send(e.message)
    }
    res.status(200).send("added")
  }
}

export const updatePost = async (req, res) => {
  if (!req.body.isEmpty) {
    try {
      const { title, content } = req.body
      await Post.where({ id: req.params.id }).save({ title, content }, { patch: true })
    } catch (e) {
      return res.send(e.message)
    }
    res.status(200).send("updated")
  }
}

export const deletePost = async (req, res) => {
  try {
    await Post.where({ id: req.params.id }).destroy()
  } catch (e) {
    return res.send(e.message)
  }
  res.status(200).send("deleted")
}
