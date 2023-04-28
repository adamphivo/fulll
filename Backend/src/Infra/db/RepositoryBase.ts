import sqlite3 from "sqlite3";
import {
  FleetRepository,
  UserRepository,
  VehiculeRepository,
} from "../../types";
import { User, Fleet, Vehicule } from "../../Domain";

export abstract class RepositorySQLiteBase {
  protected readonly db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
  }
}

interface UserRow {
  id: string;
  fleetId: string;
}

interface FleetRow {
  id: string;
  userId: string;
  vehicules: string;
}

interface VehiculeRow {
  plateNumber: string;
  location: string | null;
}

export class UserRepositorySQLite
  extends RepositorySQLiteBase
  implements UserRepository
{
  constructor(dbPath: string) {
    super(dbPath);
    this.db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      fleetId TEXT DEFAULT ''
    )
  `);
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

export class FleetRepositorySQLite
  extends RepositorySQLiteBase
  implements FleetRepository
{
  constructor(dbpath: string) {
    super(dbpath);
    this.db.run(`
    CREATE TABLE IF NOT EXISTS fleets (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      vehicules TEXT DEFAULT '',
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);
  }

  async save(fleet: Fleet): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO fleets (id, userId, vehicules) VALUES (?, ?, ?)",
        [fleet.getId(), fleet.getUserId(), fleet.getVehicules().join("|")],
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

  async findById(id: string): Promise<Fleet | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM fleets WHERE id = ?",
        [id],
        (err: Error | null, row: FleetRow | undefined) => {
          if (err) {
            reject(err);
          }
          if (!row) {
            resolve(null);
          } else {
            resolve(new Fleet(row.id, row.userId, row.vehicules.split("|")));
          }
        }
      );
    });
  }

  async registerVehicule(fleetId: string, vehicule: Vehicule): Promise<Fleet> {
    const fleet = await this.findById(fleetId);

    if (!fleet) {
      throw Error("Fleet not found.");
    }

    fleet.addVehicule(vehicule.getPlateNumber());

    await this.save(fleet);

    return fleet;
  }
}

export class VehiculeRepositorySQLite
  extends RepositorySQLiteBase
  implements VehiculeRepository
{
  constructor(dbPath: string) {
    super(dbPath);
    this.db.run(`
    CREATE TABLE IF NOT EXISTS vehicules (
      plateNumber TEXT PRIMARY KEY,
      location TEXT
    )
  `);
  }

  async save(vehicule: Vehicule): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO vehicules (plateNumber, location ) VALUES (?, ?)",
        [
          vehicule.getPlateNumber(),
          vehicule.getLocation()
            ? JSON.stringify(vehicule.getLocation())
            : null,
        ],
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

  async findByPlateNumber(plateNumber: string): Promise<Vehicule | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM vehicules WHERE plateNumber = ?",
        [plateNumber],
        (err: Error | null, row: VehiculeRow) => {
          if (err) {
            reject(err);
          }

          if (!row) {
            resolve(null);
          } else {
            resolve(
              new Vehicule(
                row.plateNumber,
                row.location ? JSON.parse(row.location) : undefined
              )
            );
          }
        }
      );
    });
  }
}
