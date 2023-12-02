import { useEffect, useRef, useState } from "react";
import useStore from "../../store";
import "./styles.scss";

const Timebar = () => {
  return (
    <div className="footer__timebar">
      <div className="footer__timebarProgressLine"></div>
    </div>
  );
};

const ProgressBar = ({ currentCombo }: { currentCombo: number }) => {
  return (
    <div className="progressBarGroup">
      <div className="progressBarGroup__progressBar">
        <div
          className="progressBarGroup__progressFlap"
          style={{
            width: `${currentCombo <= 100 ? 100 - currentCombo : 0}%`,
          }}
        ></div>
      </div>
      <p className="progressBarGroup__progressValue">{currentCombo}</p>
    </div>
  );
};

const FooterContent = () => {
  const { currentCombo, clearProgressBar } = useStore();
  const inactivityTimeout = useRef<NodeJS.Timeout>();
  const timebarTimeout = useRef<NodeJS.Timeout>();
  const [status, setStatus] = useState<"default" | "timebar">("default");

  const handleInactivity = () => {
    setStatus("timebar");
    timebarTimeout.current = setTimeout(() => {
      setStatus("default");
      clearProgressBar();
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
    }

    return () => {
      clearTimeout(inactivityTimeout.current);
      clearTimeout(timebarTimeout.current);
    };
  }, [currentCombo]);
  return (
    <>
      <ProgressBar currentCombo={currentCombo} />
      {status === "timebar" && <Timebar />}
    </>
  );
};

export default FooterContent;
