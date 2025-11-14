//import * as level from "level"
const level = require("level")

// database file path
const path = process.env?.DATABASE_PATH || `${process.cwd()}/public/kvstore.txt`

export const db = level(path)
