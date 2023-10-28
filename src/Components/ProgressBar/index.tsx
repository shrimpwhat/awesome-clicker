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
  const { currentCombo, clearProgressBar, theme, setTheme } = useStore();

  const inactivityTimeout = useRef<number | undefined>(undefined);
  const timebarTimeout = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<"default" | "timebar">("default");

  const handleInactivity = () => {
    setStatus("timebar");
    timebarTimeout.current = setTimeout(() => {
      setStatus("default");
      clearProgressBar();
      setTheme(theme.last);
    }, 4000);
  };

  useEffect(() => {
    if (currentCombo > 0) {
      if (status === "timebar") {
        setStatus("default");
        clearTimeout(timebarTimeout.current);
      }

      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => handleInactivity(), 500);

      if (currentCombo >= 100) {
        if (theme.current !== "fire") setTheme("fire");
      }
    }

    return () => {
      clearTimeout(inactivityTimeout.current);
      clearTimeout(timebarTimeout.current);
    };
  }, [currentCombo]);

  return (
    <>
      <div class="progressContainer">
        <div class="progressBarGroup" data-shaking={theme.current === "fire"}>
          <div class="progressBarGroup__progressBar">
            <div
              class="progressBarGroup__progressLine"
              style={{
                width: `${currentCombo <= 100 ? 100 - currentCombo : 0}%`,
              }}
            ></div>
          </div>
          <p class="progressBarGroup__progressValue">{currentCombo}</p>
        </div>
        {status === "timebar" && <Timebar />}
      </div>
    </>
  );
};

export default ProgressBar;
