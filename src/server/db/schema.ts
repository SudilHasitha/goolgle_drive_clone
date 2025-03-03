// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
// import "server-only";

import { index, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core";
import { int, text } from "drizzle-orm/singlestore-core";

export const createTables = singlestoreTableCreator(
  (name) => `db_sudil_drive_${name}`
);

export const files_table = createTables("files_table",{
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  owner_id: text("owner_id").notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
  size: int("size").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (t) => {
  return [
    index('parent_index').on(t.parent),
    index('owner_id_index').on(t.owner_id)
  ]
})

export const folders_table = createTables("folders_table",{
  id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
  owner_id: text("owner_id").notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", {mode: "number", unsigned: true}),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (t) => {
  return [
    index('parent_index').on(t.parent),
    index('owner_id_index').on(t.owner_id)
  ]
})

export type DB_FileType = typeof files_table.$inferSelect;
export type DB_FolderType = typeof folders_table.$inferSelect;