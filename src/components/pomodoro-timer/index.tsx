import { useState } from "react";
import { useInterval } from "../../hooks/use-interval";
import { secondsToTime } from "../../utils/seconds-to-time";

interface PomodoroTimerProps {
  defaultPomodoroTimer: number;
}

export const PomodoroTimer = (props: PomodoroTimerProps) => {
  const [mainTimer, setMainTimer] = useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTimer((prevMainTimer) => prevMainTimer - 1);
  }, 1000);

  return (
    <div>
      <h1>Say Heloo</h1>
      <h2>{secondsToTime(mainTimer)}</h2>
    </div>
  );
};
