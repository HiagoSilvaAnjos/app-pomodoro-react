import { zeroLeft } from "./zero-left";

export const secondsToTime = (secondsProps: number): string => {
  const hours = zeroLeft(secondsProps / 3600);
  const minutes = zeroLeft((secondsProps / 60) % 60);

  const seconds = zeroLeft((secondsProps % 60) % 60);

  return `${hours}:${minutes}:${seconds}`;
};
