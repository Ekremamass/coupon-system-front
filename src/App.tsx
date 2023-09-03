import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Layout/Header/Header";
import Main from "./Components/Layout/Main/Main";
import Menu from "./Components/Layout/Menu/Menu";
import Footer from "./Components/Layout/Footer/Footer";
import { Theme } from "./Models/Theme";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<Theme>(`dark-mode`);

  const changeTheme = () => {
    setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
  };

  

  return (
    <div className={`App ${theme} ${i18n.language}`}>
      <Header />
      <div className="theme-button" >
        <button className="no-bg-button " onClick={changeTheme}>
          {theme === "light-mode" ? (
            <span className="big-emoji">🌝</span>
          ) : (
            <span className="big-emoji">🌚</span>
          )}
        </button>
      </div>
      <Menu />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
