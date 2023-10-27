import "./app.scss";
import Clicker from "./Components/ClickButton";
import ProgressBar from "./Components/ProgressBar";
import StarIcon from "./assets/star.svg";

export const App = () => {
  return (
    <>
      <header class="header">
        <img src={StarIcon} class="header__star" />
        <h1 class="header__title">Awesome clicker!</h1>
        <img src={StarIcon} class="header__star" />
      </header>
      {/* <hr class="app__headerDivider" /> */}
      <main>
        <Clicker />
      </main>
      <footer class="footer">
        <ProgressBar />
      </footer>
    </>
  );
};
