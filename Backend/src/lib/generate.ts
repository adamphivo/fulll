import type { Location } from "../types";

const generate = () => {};

generate.location = (): Location => {
  return {
    longitude: (Math.random() * 360 - 180).toFixed(8),
    latitude: (Math.random() * 180 - 90).toFixed(8),
    altitude: (Math.random() * 5000).toFixed(8),
  };
};

export { generate };
