import "./Main.scss";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";

export const Clicker = () => {
  const { clicks, handleClick } = useStore(
    useShallow((state) => ({
      clicks: state.clicks,
      handleClick: state.handleClick,
    }))
  );

  const getRandomColor = () => {
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;

    let bgColor = "white";
    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      bgColor = "black";
    }
    const color = `rgb(${red}, ${green}, ${blue})`;
    return {
      color,
      backgroundColor: bgColor,
    };
  };

  return (
    <div className="clicker">
      <h1 className="clicker__totalClicks">
        <span className="clicker__title">Total clicks:</span>
        <br />
        <span style={getRandomColor()} className="clicker__clicksValue">
          {clicks}
        </span>
      </h1>
      <button onClick={handleClick} className="clicker__clickBtn">
        Click
      </button>
    </div>
  );
};

export default Clicker;
