export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleepRandom = (ms: number) => {
  const latency = Math.floor(Math.random() * ms);
  return new Promise((resolve) => setTimeout(resolve, latency));
};
