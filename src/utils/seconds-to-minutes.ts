import { zeroLeft } from "./zero-left";

export const secondsToMinute = (secondsProps: number): string => {
  const minutes = zeroLeft((secondsProps / 60) % 60);

  const seconds = zeroLeft((secondsProps % 60) % 60);

  return `${minutes}:${seconds}`;
};
