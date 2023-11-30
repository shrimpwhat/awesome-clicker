import FireIcon from "../assets/fire.svg";
import { JSX, useEffect, useState, useRef } from "react";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";

function FireSpawner() {
  const [icons, setIcons] = useState<JSX.Element[]>([]);
  const count = useRef<number>(1);
  const { theme, clicks } = useStore(
    useShallow((state) => ({ theme: state.theme, clicks: state.clicks }))
  );

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
    setTimeout(
      () =>
        setIcons((prev) => {
          return [...prev.slice(1)];
        }),
      6000
    );
  };

  useEffect(() => {
    if (theme.current === "fire") addIcon();
  }, [clicks]);

  return <div className="fireSpawner">{icons}</div>;
}

export default FireSpawner;
