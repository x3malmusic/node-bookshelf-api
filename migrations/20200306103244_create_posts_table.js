exports.up = knex => {
  return knex.schema.createTable("posts", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("title").notNullable();
    table.string("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = knex => {
  return knex.schema.dropTable("posts");
};
