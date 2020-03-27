const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  const password = await bcrypt.hash("qweasd", 12);
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, email: "test@email.com", password },
        { id: 2, email: "test2@email.com", password },
        { id: 3, email: "test3@email.com", password },
      ]);
    });
};
