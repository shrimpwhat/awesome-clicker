import "./app.scss";
import Clicker from "./Components/Main";
import FooterContent from "./Components/Footer";
import HeaderTitle from "./Components/Header";

export const App = () => {
  return (
    <>
      <header class="header">
        <HeaderTitle />
      </header>
      <main>
        <Clicker />
      </main>
      <footer class="footer">
        <FooterContent />
      </footer>
    </>
  );
};
