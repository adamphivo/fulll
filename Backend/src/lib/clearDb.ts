import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function clearDb() {
  const db = await open({
    filename: "testDB.db",
    driver: sqlite3.Database,
  });

  const tables = ["users", "fleets", "vehicles"];

  for (const tableName in tables) {
    const exist = await db.get(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );

    if (exist) {
      await db.run(`DELETE FROM ${tableName}`);
    }
  }

  await db.close();
}
