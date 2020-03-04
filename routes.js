const { Router } = require("express");
const router = new Router();
const Post = require("./models/Post");

router.get("/get", async (req, res) => {
  const posts = await Post.fetchAll();
  if (posts) {
    return res.json(posts);
  }
  return res.send("error in fetching posts");
});

router.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.forge({ title, content }).save();
  } catch (e) {
    return res.send(e);
  }
  res.send("added");
});

router.put("/update", async (req, res) => {
  try {
    const { id, title, content } = req.body;
    const post = await Post.where({ id }).fetch();
    //     res.send(post)
    await Post.where({ id }).save({ title, content }, {patch: true});
  } catch (e) {
    return res.send(e);
  }
  res.send("update");
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Post.where({ id }).destroy();
  } catch (e) {
    return res.send(e);
  }
  res.send("deleted");
});

module.exports = router;
