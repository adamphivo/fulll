import type { Location } from "../types";

interface Generator {
  location: () => Location;
}

export const generate: Generator = {
  location: (): Location => {
    return {
      longitude: (Math.random() * 360 - 180).toFixed(8),
      latitude: (Math.random() * 180 - 90).toFixed(8),
      altitude: (Math.random() * 5000).toFixed(8),
    };
  },
};
