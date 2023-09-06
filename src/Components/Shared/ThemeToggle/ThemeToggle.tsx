import { useState } from "react";
import "./ThemeToggle.css";
import { Theme } from "../../../Models/Theme";
import store from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import { updatedThemeAction } from "../../../Redux/ThemeAppState";

function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>(
    store.getState().themeReducer.theme
  );
  const dispatch = useDispatch();
  const changeTheme = () => {
    setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
    dispatch(updatedThemeAction());
  };

  return (
    <div className="ThemeToggle">
        <button className="no-bg-button" onClick={changeTheme}>
          {theme === "light-mode" ? (
            <span className="big-emoji">🌚</span>
          ) : (
            <span className="big-emoji">🌝</span>
          )}
        </button>
    </div>
  );
}

export default ThemeToggle;
