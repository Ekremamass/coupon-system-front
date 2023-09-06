import { useTranslation } from "react-i18next";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import "./Header.css";
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";

function Header(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="Header">
      <h1>🎫{t("title")}</h1>
      <div className="info">
        <AuthMenu />
        <SelectLanguage />
        <ThemeToggle/>
      </div>
    </div>
  );
}

export default Header;
