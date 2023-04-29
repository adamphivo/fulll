import { BaseRepositorySQLite } from "./BaseRepositorySQLite";
import { FleetRepository } from "../../../types";
import { Fleet, Vehicle } from "../../../Domain";

interface FleetRow {
  id: string;
  userId: string;
  vehicles: string;
}

export class FleetRepositorySQLite
  extends BaseRepositorySQLite
  implements FleetRepository
{
  constructor(dbpath: string) {
    super(dbpath);
  }

  async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        CREATE TABLE IF NOT EXISTS fleets (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          vehicles TEXT DEFAULT '',
          FOREIGN KEY(userId) REFERENCES users(id)
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

  async save(fleet: Fleet): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO fleets (id, userId, vehicles) VALUES (?, ?, ?)",
        [fleet.getId(), fleet.getUserId(), fleet.getVehicles().join("|")],
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
            resolve(new Fleet(row.id, row.userId, row.vehicles.split("|")));
          }
        }
      );
    });
  }

  async registerVehicle(fleetId: string, vehicle: Vehicle): Promise<Fleet> {
    const fleet = await this.findById(fleetId);

    if (!fleet) {
      throw Error("Fleet not found.");
    }

    fleet.addVehicle(vehicle.getPlateNumber());

    await this.save(fleet);

    return fleet;
  }
}
