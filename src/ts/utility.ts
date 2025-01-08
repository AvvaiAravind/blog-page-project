const generateRandomId = (randomRange: number = 1000): string => {
  const timeStamp = Date.now();
  const randomValue = Math.floor(Math.random() * randomRange);
  return `${timeStamp}-${randomValue}`;
};

export { generateRandomId };
