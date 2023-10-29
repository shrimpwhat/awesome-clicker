import "./app.scss";
import Clicker from "./Components/ClickButton";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Clicker />
      </main>
      <Footer />
    </>
  );
};
