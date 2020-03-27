import bookshelf from "../bookshelf";

export const User = bookshelf.model("User", {
  tableName: "users"
});
