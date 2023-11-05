import useStore from "../../store";
import SunIcon from "../../assets/sun.svg";
import MoonIcon from "../../assets/moon.svg";
import { useShallow } from "zustand/react/shallow";

export default function ThemeToggler() {
  const { theme, setTheme } = useStore(
    useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme }))
  );

  const toggleTheme = () => {
    setTheme(theme.current === "light" ? "dark" : "light");
  };

  return (
    <button class="header__themeToggleButton" onClick={toggleTheme}>
      <img
        src={theme.current === "light" ? MoonIcon : SunIcon}
        class="header__themeToggleIcon"
      />
    </button>
  );
}
