import sqlite3 from "sqlite3";

export abstract class BaseRepositorySQLite {
  protected readonly db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
  }
}
