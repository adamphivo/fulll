export class Fleet {
  constructor(
    private id: string,
    private userId: string,
    private vehiculesIds: string[]
  ) {}

  public addVehicule(vehiculeId: string) {
    this.vehiculesIds.push(vehiculeId);
  }

  public getVehicules() {
    return this.vehiculesIds;
  }

  public getUserId() {
    return this.userId;
  }

  public getId() {
    return this.id;
  }
}
