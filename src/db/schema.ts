import * as t from "drizzle-orm/sqlite-core";

export const users = t.sqliteTable("users", {
  id: t.integer().primaryKey({
    autoIncrement: true,
  }),
  firstname: t.text().notNull(),
  lastname: t.text().notNull(),
  std_id: t.text().notNull(),
  dob: t.text().notNull(),
  sex: t.text().notNull()
});