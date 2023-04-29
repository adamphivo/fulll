import { BaseRepositorySQLite } from "./BaseRepositorySQLite";
import { VehicleRepository } from "../../../types";
import { Vehicle } from "../../../Domain";

interface VehicleRow {
  plateNumber: string;
  location: string | null;
}

export class VehicleRepositorySQLite
  extends BaseRepositorySQLite
  implements VehicleRepository
{
  constructor(dbPath: string) {
    super(dbPath);
  }

  async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        CREATE TABLE IF NOT EXISTS vehicles (
          plateNumber TEXT PRIMARY KEY,
          location TEXT
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

  async save(vehicle: Vehicle): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO vehicles (plateNumber, location ) VALUES (?, ?)",
        [
          vehicle.getPlateNumber(),
          vehicle.getLocation() ? JSON.stringify(vehicle.getLocation()) : null,
        ],
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

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM vehicles WHERE plateNumber = ?",
        [plateNumber],
        (err: Error | null, row: VehicleRow) => {
          if (err) {
            reject(err);
          }

          if (!row) {
            resolve(null);
          } else {
            resolve(
              new Vehicle(
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
