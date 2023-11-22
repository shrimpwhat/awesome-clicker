import "./app.scss";
import Clicker from "./Components/Main";
import FooterContent from "./Components/Footer";
import { HeaderTitle, ThemeToggler } from "./Components/Header";
import FireSpawner from "./Components/FireSpawner";
import Particles3D from "./Components/Particles3D.jsx";

const App = () => {
  return (
    <>
      <Particles3D />
      {/* <FireSpawner />
      <header className="header">
        <HeaderTitle />
        <ThemeToggler />
      </header>
      <main>
        <Clicker />
      </main>
      <footer className="footer">
        <FooterContent />
      </footer> */}
    </>
  );
};

export default App;
