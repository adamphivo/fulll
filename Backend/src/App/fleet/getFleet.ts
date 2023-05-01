import { Fleet } from "../../Domain";
import { FleetRepository } from "../../types";
import { Configuration } from "../../Infra/configuration";

export class GetFleetQuery {
  constructor(public readonly userId: string) {}
}

export class GetFleetHandler {
  constructor(private fleetRepository: FleetRepository) {}

  async handle(query: GetFleetQuery): Promise<Fleet> {
    const fleet = await this.fleetRepository.findByUserId(query.userId);

    if (!fleet) {
      throw Error(Configuration.ERROR_MESSAGES.USER_HAS_NO_FLEET);
    }

    return fleet;
  }
}
