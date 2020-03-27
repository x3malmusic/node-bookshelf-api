// user: "developer",
// password: "new_password",

module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "postgres",
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations",
  },
};
