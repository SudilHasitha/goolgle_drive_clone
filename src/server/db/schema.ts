// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("users_example", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age")
});