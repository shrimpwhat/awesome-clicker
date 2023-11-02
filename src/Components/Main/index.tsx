import "./styles.scss";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";

export const Clicker = () => {
  const { clicks, handleClick, theme } = useStore(
    useShallow((state) => ({
      clicks: state.clicks,
      handleClick: state.handleClick,
      theme: state.theme,
    }))
  );

  const getRandomColor = (): { color: string; backgroundColor: string } => {
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;

    let bgColor;
    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      bgColor = "black";
    } else {
      bgColor = "white";
    }
    return {
      color: `rgb(${red}, ${green}, ${blue})`,
      backgroundColor: bgColor,
    };
  };

  return (
    <div class="clicker">
      <h1 class="clicker__totalClicks">
        Total clicks:{" "}
        <span style={getRandomColor()} class="clicker__clicksValue">
          {clicks}
        </span>
      </h1>
      <button onClick={handleClick} class="clicker__clickBtn">
        Click
      </button>
    </div>
  );
};

export default Clicker;
