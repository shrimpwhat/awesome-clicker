import StarIcon from "../../assets/star.svg";
import "./styles.scss";

export default function HeaderTitle() {
  return (
    <div className="titleContainer">
      <img src={StarIcon} className="titleContainer__starIcon" />
      <h1 className="titleContainer__title">Awesome clicker!</h1>
      <img src={StarIcon} className="titleContainer__starIcon" />
    </div>
  );
}
