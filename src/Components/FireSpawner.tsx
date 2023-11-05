import FireIcon from "../assets/fire.svg";
import { JSX, useEffect, useState, useRef } from "preact/compat";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";

export default function FireSpawner() {
  const [icons, setIcons] = useState<JSX.Element[]>([]);
  const theme = useStore(useShallow((state) => state.theme));
  const appendInterval = useRef<number>();
  const count = useRef<number>(1);

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 80 + 10);
    const y = Math.floor(Math.random() * 50);
    return [x, y];
  };

  const addIcon = () => {
    ++count.current;
    const [x, y] = getRandomPosition();
    setIcons((prev) => [
      ...prev,
      <img
        className="fireSpawner__icon"
        src={FireIcon}
        key={count.current}
        style={{ left: `${x}%`, bottom: `${y}%` }}
      />,
    ]);
  };

  useEffect(() => {
    if (appendInterval.current === undefined) {
      appendInterval.current = setInterval(() => {
        setTimeout(
          () =>
            setIcons((prev) => {
              return [...prev.slice(1)];
            }),
          6000
        );
        addIcon();
      }, 500);
    }
    return () => clearInterval(appendInterval.current);
  }, []);

  if (theme.current === "fire") {
    return <div class="fireSpawner">{icons}</div>;
  }
  return <></>;
}
