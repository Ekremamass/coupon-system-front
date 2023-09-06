import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Layout/Header/Header";
import Main from "./Components/Layout/Main/Main";
import Menu from "./Components/Layout/Menu/Menu";
import Footer from "./Components/Layout/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/Store";

function App() {
  const { i18n } = useTranslation();

  const theme = useSelector((state: RootState)=>state.themeReducer.theme);
  
  return (
    <div className={`App ${theme} ${i18n.language}`}>
      <Header />
      <Menu />
      <Main />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
