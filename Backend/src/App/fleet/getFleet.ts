import { Fleet } from "../../Domain";
import { FleetRepository } from "../../types";

export class GetFleetQuery {
  constructor(public readonly userId: string) {}
}

export class GetFleetHandler {
  constructor(private fleetRepository: FleetRepository) {}

  async handle(query: GetFleetQuery): Promise<Fleet> {
    const fleet = await this.fleetRepository.findByUserId(query.userId);

    if (!fleet) {
      throw Error("No fleet attached to this user.");
    }

    return fleet;
  }
}
