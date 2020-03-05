exports.up = knex => {
  return knex.schema.createTable("posts", table => {
    table
      .increments("id")
      .unsigned()
      .primary()
    table.string("title").notNullable()
    table.string("content").notNullable()
  })
}

exports.down = knex => {
  return knex.schema.dropTable("posts")
}
