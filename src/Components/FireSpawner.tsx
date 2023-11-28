import FireIcon from "../assets/fire.svg";
import { JSX, useEffect, useState, useRef } from "react";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";

function FireSpawner() {
  const [icons, setIcons] = useState<JSX.Element[]>([]);
  const count = useRef<number>(1);

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 60 + 20);
    const y = Math.floor(Math.random() * 30);
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
    const timeouts: number[] = [];
    const interval = setInterval(() => {
      addIcon();
      const timeout = setTimeout(
        () =>
          setIcons((prev) => {
            return [...prev.slice(1)];
          }),
        6000
      );
      timeouts.push(timeout);
    }, 500);

    return () => {
      clearInterval(interval);
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return <div className="fireSpawner">{icons}</div>;
}

export default function Wrapper() {
  const theme = useStore(useShallow((state) => state.theme));
  if (theme.current === "fire") {
    return <FireSpawner />;
  }
}
