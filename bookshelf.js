const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "developer",
    password: "new_password",
    database: "postgres",
    charset: "utf8"
  }
});
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
