const bookshelf = require("../bookshelf");

const Post = bookshelf.model("Post", {
  tableName: "post"
});

module.exports = Post;
