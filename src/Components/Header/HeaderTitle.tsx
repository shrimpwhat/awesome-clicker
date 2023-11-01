import StarIcon from "../../assets/star.svg";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";
import "./styles.scss";

export default function HeaderTitle() {
  const theme = useStore(useShallow((state) => state.theme));

  return (
    <div class="titleContainer" data-shaking={theme.current === "fire"}>
      <img src={StarIcon} class="titleContainer__starIcon" />
      <h1 class="titleContainer__title">Awesome clicker!</h1>
      <img src={StarIcon} class="titleContainer__starIcon" />
    </div>
  );
}
