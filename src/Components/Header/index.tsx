import StarIcon from "../../assets/star.svg";
import useStore from "../../store";
import "./styles.scss";

export default function Header() {
  const { theme } = useStore();

  return (
    <header>
      <div class="titleContainer" data-shaking={theme.current === "fire"}>
        <img src={StarIcon} class="titleContainer__star" />
        <h1 class="titleContainer__title">Awesome clicker!</h1>
        <img src={StarIcon} class="titleContainer__star" />
      </div>
    </header>
  );
}
