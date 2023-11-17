import "./app.scss";
import Clicker from "./Components/Main";
import FooterContent from "./Components/Footer";
import { HeaderTitle, ThemeToggler } from "./Components/Header";
import FireSpawner from "./Components/FireSpawner";

const App = () => {
  return (
    <>
      <FireSpawner />
      <header className="header">
        <HeaderTitle />
        <ThemeToggler />
      </header>
      <main>
        <Clicker />
      </main>
      <footer className="footer">
        <FooterContent />
      </footer>
    </>
  );
};

export default App;
