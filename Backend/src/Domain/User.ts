export class User {
  constructor(private id: string, private fleetId: string) {}

  public getId() {
    return this.id;
  }

  public getFleetId() {
    return this.fleetId;
  }
}
