import http from "../../http";

export default {
  async deletePost(ctx, id) {
    await http.delete(`/posts/${id}`);
  },

  async acceptPost(ctx, {post, title, content}) {
    await http
        .put(`/posts/${post.id}`, {
          title,
          content
        })
  },
};
