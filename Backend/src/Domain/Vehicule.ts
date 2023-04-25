export class Vehicule {
  plateNumber: string;
  location?: string;

  constructor(plateNumber: string, location?: string) {
    this.plateNumber = plateNumber;
  }

  getLocation() {
    return this.location;
  }

  getPlateNumber() {
    return this.plateNumber;
  }

  setLocation(location: string) {
    this.location = location;
  }

  setPlateNumber(plateNumber: string) {
    this.plateNumber = plateNumber;
  }
}
