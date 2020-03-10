import { Post } from "../../models/Post";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.where({ user_id: req.params.userId })
      .orderBy("id", "ASC")
      .fetchAll({
        require: false
      });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

export const addPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (title && title.length > 3) {
      await Post.forge({ user_id: req.params.userId, title, content }).save();
    } else {
      res
        .status(400)
        .json({ message: "Title cannot be shorter than 3 characters" });
    }
  } catch (e) {
    next(e);
  }
  res.status(201).json({ message: "Post added" });
};

export const updatePost = async (req, res, next) => {
  if (!req.body.isEmpty) {
    try {
      const { title, content } = req.body;
      if (title && title.length > 3) {
        await Post.where({ id: req.params.id }).save(
          {
            title,
            content,
            updated_at: new Date(new Date().getTime())
          },
          { patch: true }
        );
      } else {
        res
          .status(400)
          .json({ message: "Title cannot be shorter than 3 characters" });
      }
    } catch (e) {
      next(e);
    }
    res.status(200).json({ message: "Post updated" });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await Post.where({ id: req.params.id }).destroy();
  } catch (e) {
    next(e);
  }
  res.status(200).json({ message: "Post deleted" });
};
