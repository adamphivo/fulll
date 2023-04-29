import { BaseRepositorySQLite } from "./BaseRepositorySQLite";
import { UserRepository } from "../../../types";
import { User } from "../../../Domain";

interface UserRow {
  id: string;
  fleetId: string;
}

export class UserRepositorySQLite
  extends BaseRepositorySQLite
  implements UserRepository
{
  constructor(dbPath: string) {
    super(dbPath);
  }

  async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        fleetId TEXT DEFAULT ''
      )
    `,
        (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async save(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO users (id, fleetId) VALUES (?, ?)",
        [user.getId(), user.getFleetId()],
        (err: Error | null, row: UserRow | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err: Error | null, row: UserRow | undefined) => {
          if (err) {
            reject(err);
          }
          if (!row) {
            resolve(null);
          } else {
            resolve(new User(row.id, row.fleetId));
          }
        }
      );
    });
  }
}
