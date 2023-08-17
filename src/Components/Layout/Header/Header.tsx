import { useTranslation } from "react-i18next";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import "./Header.css";

function Header(): JSX.Element {
  const { t } = useTranslation();
  
  return (
    <div className="Header">
      <SelectLanguage/>
        <span>🎫</span>
        <h1>{t('title')}</h1>
        <span>🎫</span>
      <AuthMenu />
    </div>
  );
}

export default Header;
