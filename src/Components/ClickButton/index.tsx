import "./styles.scss";
import useStore from "../../store";

export const Clicker = () => {
  const clicks = useStore((state) => state.clicks);
  const handleClick = useStore((state) => state.handleClick);

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
        Total clicks: <span style={getRandomColor()}>{clicks}</span>
      </h1>
      <button onClick={handleClick} class="clicker__clickBtn">
        Click
      </button>
    </div>
  );
};

export default Clicker;
