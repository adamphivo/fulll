export class Vehicule {
  plateNumber: string;
  location?: string;

  constructor(plateNumber: string, location?: string) {
    this.plateNumber = plateNumber;
  }
}
