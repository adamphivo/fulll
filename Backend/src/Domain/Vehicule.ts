import type { Location } from "../types";

export class Vehicule {
  constructor(private plateNumber: string, private location?: Location) {}

  public async setLocation(location: Location) {
    this.location = location;
  }

  public getLocation() {
    return this.location;
  }

  public getPlateNumber() {
    return this.plateNumber;
  }
}
