import http from "../../http";

export default {
  async deletePost(ctx, id) {
    await http.delete(`/posts/${id}`);
  },
};
