import { Fleet } from "./Fleet";

export class User {
  public id: string;
  public fleet: Fleet;

  constructor(id: string, fleet: Fleet) {
    this.id = id;
    this.fleet = fleet;
  }
}
