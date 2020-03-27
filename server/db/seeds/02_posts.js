exports.seed = function (knex) {
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          id: 1,
          title: "title",
          content: "asdasddfgdfgdfg",
          created_at: new Date(new Date().getTime()),
          updated_at: new Date(new Date().getTime()),
          user_id: 1,
        },
        {
          id: 2,
          title: "title2",
          content: "fghfghghfgh",
          created_at: new Date(new Date().getTime()),
          updated_at: new Date(new Date().getTime()),
          user_id: 1,
        },
        {
          id: 3,
          title: "title3",
          content: "asdasddxvbxvbxvbfgdfgdfg",
          created_at: new Date(new Date().getTime()),
          updated_at: new Date(new Date().getTime()),
          user_id: 2,
        },
        {
          id: 4,
          title: "title4",
          content: "uipiopuiop",
          created_at: new Date(new Date().getTime()),
          updated_at: new Date(new Date().getTime()),
          user_id: 3,
        },
      ]);
    });
};
