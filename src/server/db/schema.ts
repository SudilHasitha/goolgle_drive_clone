// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, singlestoreTableCreator, bigint } from "drizzle-orm/singlestore-core";
import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

export const createTables = singlestoreTableCreator(
  (name) => `db_sudil_drive_${name}`
);

export const files = createTables("files_table",{
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
  size: int("size").notNull()
}, (t) => {
  return [
    index('parent_index').on(t.parent)
  ]
})

export const folders = createTables("folders_table",{
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true})
}, (t) => {
  return [
    index('parent_index').on(t.parent)
  ]
})