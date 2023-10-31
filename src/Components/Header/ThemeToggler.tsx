import useStore from "../../store";
import SunIcon from "../../assets/sun.svg";
import MoonIcon from "../../assets/moon.svg";

export default function ThemeToggler() {
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    setTheme(theme.current === "light" ? "dark" : "light");
  };

  return (
    <button class="header__themeToggleButton" onClick={toggleTheme}>
      <img
        src={theme.current === "light" ? MoonIcon : SunIcon}
        class="themeToggler__sunIcon"
      />
    </button>
  );
}
