import bookshelf from "../bookshelf"

export const Post = bookshelf.model("Post", {
  tableName: "posts"
})
