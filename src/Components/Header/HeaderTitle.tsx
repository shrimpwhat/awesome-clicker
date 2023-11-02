import StarIcon from "../../assets/star.svg";
import "./styles.scss";

export default function HeaderTitle() {
  return (
    <div class="titleContainer">
      <img src={StarIcon} class="titleContainer__starIcon" />
      <h1 class="titleContainer__title">Awesome clicker!</h1>
      <img src={StarIcon} class="titleContainer__starIcon" />
    </div>
  );
}
