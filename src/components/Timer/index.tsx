import { secondsToMinute } from "../../utils/seconds-to-minutes";

interface TimerProps {
  timer: number;
}

export const Timer = (props: TimerProps) => {
  return <div className="timer">{secondsToMinute(props.timer)}</div>;
};
