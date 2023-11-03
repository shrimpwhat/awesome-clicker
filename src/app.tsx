import "./app.scss";
import Clicker from "./Components/Main";
import FooterContent from "./Components/Footer";
import { HeaderTitle, ThemeToggler } from "./Components/Header";
import FireSpawner from "./Components/FireSpawner";

export const App = () => {
  return (
    <>
      <FireSpawner />

      <header class="header">
        <HeaderTitle />
        <ThemeToggler />
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
