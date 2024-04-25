import { PomodoroTimer } from "./components/pomodoro-timer";

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        PomodoroTimer={1500}
        shortRestTimer={300}
        LongRestTimer={900}
        Cycles={4}
      />
    </div>
  );
}

export default App;
