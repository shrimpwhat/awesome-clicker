import useStore from "./store";
import "./app.scss";
import ProgressBar from "./ProgressBar";

export const App = () => {
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
    <>
      <ProgressBar />
      <h1 style={{ marginBottom: "150px" }}>
        Total clicks: <span style={getRandomColor()}>{clicks}</span>
      </h1>
      <button onClick={handleClick} class="app__clickBtn">
        Click
      </button>
      <div class="gradient-box"></div>
    </>
  );
};
