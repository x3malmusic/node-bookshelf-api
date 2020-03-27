import knex from "knex"
import bookshelf from "bookshelf"
const knexConfig = require("./knexfile")

export default bookshelf(knex(knexConfig))
