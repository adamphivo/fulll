export class Fleet {
  constructor(
    private id: string,
    private userId: string,
    private vehiclesIds: string[]
  ) {}

  public addVehicle(vehicleId: string) {
    this.vehiclesIds.push(vehicleId);
  }

  public getVehicles() {
    return this.vehiclesIds;
  }

  public getUserId() {
    return this.userId;
  }

  public getId() {
    return this.id;
  }
}
