import type { Location } from "../types";

export class Vehicule {
  plateNumber: string;
  location?: Location;

  constructor(plateNumber: string, location?: string) {
    this.plateNumber = plateNumber;
  }
}
