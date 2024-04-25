// Hooks
import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../../hooks/use-interval";

// Components
import { Button } from "../Button";
import { Timer } from "../Timer";

// Audios
import bellStart from "../../sounds/bell-start.mp3";
import bellFinish from "../../sounds/bell-finish.mp3";
import { secondsToTime } from "../../utils/seconds-to-time";

const soundStart = new Audio(bellStart);
const soundFinish = new Audio(bellFinish);

interface PomodoroTimerProps {
  PomodoroTimer: number;
  shortRestTimer: number;
  LongRestTimer: number;
  Cycles: number;
}

export const PomodoroTimer = (props: PomodoroTimerProps) => {
  const [mainTimer, setMainTimer] = useState(props.PomodoroTimer);
  const [timeCounter, setTimeCounter] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.Cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTimer((prevMainTimer) => prevMainTimer - 1);
      if (working)
        setFullWorkingTime((prevFullWorkingTime) => prevFullWorkingTime + 1);
    },
    timeCounter ? 1000 : null
  );

  const handleClickButtonWork = useCallback(() => {
    setTimeCounter(true);
    setWorking(true);
    setResting(false);
    setMainTimer(props.PomodoroTimer);

    soundStart.play();
  }, [props.PomodoroTimer]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounter(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTimer(props.LongRestTimer);
      } else {
        setMainTimer(props.shortRestTimer);
      }

      soundFinish.play();
    },
    [props.LongRestTimer, props.shortRestTimer]
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTimer > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.Cycles - 1).fill(true));
      setCompletedCycles((prevCompletedCycles) => prevCompletedCycles + 1);
    }

    if (working)
      setNumberOfPomodoros(
        (prevNumberOfPomodoros) => prevNumberOfPomodoros + 1
      );

    if (resting) handleClickButtonWork();
  }, [
    configureRest,
    cyclesQtdManager,
    handleClickButtonWork,
    mainTimer,
    props.Cycles,
    resting,
    working,
  ]);

  return (
    <div className="pomodoro-container">
      <h1>Você está: {working ? "Trabalhando" : "Descansando"}!</h1>
      <Timer timer={mainTimer} />
      <div className="pomodoro-buttons">
        <Button textButton="Work" handleClickButton={handleClickButtonWork} />
        <Button
          textButton="Rest"
          handleClickButton={() => configureRest(false)}
        />
        <Button
          className={!working && !resting ? "hidden" : ""}
          textButton={timeCounter ? "Pause" : "Play"}
          handleClickButton={() => setTimeCounter(!timeCounter)}
        />
      </div>
      <div className="pomodoro-details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Total de ciclos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
};
