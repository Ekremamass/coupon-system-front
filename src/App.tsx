import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Layout/Header/Header";
import Main from "./Components/Layout/Main/Main";
import Menu from "./Components/Layout/Menu/Menu";
import Footer from "./Components/Layout/Footer/Footer";
import { Theme } from "./Models/Theme";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<Theme>(`dark-mode`);

  const changeTheme = () => {
    setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
  };

  return (
    <div className={`App ${theme}`}>
      <button className="no-bg-button" onClick={changeTheme}>
        {theme === "light-mode" ? <span className="big-emoji">🌝</span> : <span className="big-emoji">🌚</span>}
      </button>
      <Header />
      <Menu />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
