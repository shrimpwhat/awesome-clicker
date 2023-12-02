import "./app.scss";
import Clicker from "./Components/Main/index.js";
import FooterContent from "./Components/Footer";
import { HeaderTitle, ThemeToggler } from "./Components/Header/index.js";
import FireSpawner from "./Components/FireSpawner/FireSpawner.js";
import ParticlesCanvas from "./Components/ParticlesCanvas/ParticlesCanvas.js";

const App = () => {
  return (
    <>
      <ParticlesCanvas />
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
