import { useEffect, useRef, useState } from "preact/hooks";
import useStore from "./store";

const Timebar = () => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "200px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          height: "10px",
          backgroundColor: "grey",
          width: `${progress}%`,
          transition: "width 0.1s",
        }}
      ></div>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="progress-bar" style={{ width: "600px" }}>
        <div
          className="progress"
          style={{
            width: `${barProgress <= 100 ? barProgress : 100}%`,
            textAlign: "right",
          }}
        >
          <span style={{ marginRight: "10px" }}>{`${barProgress}`}</span>
        </div>
      </div>
      {status === "timebar" && <Timebar />}
    </div>
  );
};

export default ProgressBar;
