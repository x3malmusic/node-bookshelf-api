exports.up = knex => {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table
      .string("email")
      .notNullable()
      .unique();
    table.string("password").notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable("users");
};
