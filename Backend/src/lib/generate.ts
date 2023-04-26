const generate = () => {};

generate.location = () => {
  return {
    longitude: (Math.random() * 360 - 180).toFixed(8),
    latitude: (Math.random() * 180 - 90).toFixed(8),
  };
};

export { generate };
