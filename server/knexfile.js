// user: "developer",
// password: "new_password",

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations",
  },
};
