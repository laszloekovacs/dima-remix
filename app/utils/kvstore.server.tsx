//import * as level from "level"
import { Level } from "level"

// database file path
const path = process.env?.DATABASE_PATH || `${process.cwd()}/public/kvstore`

export const db = new Level(path)
