import { useEffect, useRef, useState } from "preact/hooks";
import useStore from "../../store";
import "./styles.scss";

const Timebar = () => {
  return (
    <div class="progressContainer__timebar">
      <div class="progressContainer__timebar__progress"></div>
    </div>
  );
};

const ProgressBar = () => {
  const barProgress = useStore((state) => state.barProgress);
  const clearProgressBar = useStore((state) => state.clearProgressBar);

  const inactivityTimeout = useRef<number | undefined>(undefined);
  const timebarTimeout = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<"default" | "timebar">("default");

  const handleInactivity = () => {
    setStatus("timebar");
    timebarTimeout.current = setTimeout(() => {
      setStatus("default");
      clearProgressBar();
    }, 2000);
  };

  useEffect(() => {
    if (barProgress > 0) {
      if (status === "timebar") {
        setStatus("default");
        clearTimeout(timebarTimeout.current);
      }

      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => handleInactivity(), 500);
    }

    return () => {
      clearTimeout(inactivityTimeout.current);
      clearTimeout(timebarTimeout.current);
    };
  }, [barProgress]);

  return (
    <div class="progressContainer">
      <div className="progressContainer__progressBar">
        <div
          className="progressContainer__progressBar__progress"
          style={{
            width: `${barProgress <= 100 ? barProgress : 100}%`,
          }}
        ></div>
      </div>
      <p class="progressContainer__progressValue">{barProgress}</p>
      {status === "timebar" && <Timebar />}
    </div>
  );
};

export default ProgressBar;
