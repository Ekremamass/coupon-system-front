import { useTranslation } from "react-i18next";
import "./Copyrights.css";

function Copyrights(): JSX.Element {
  const year = new Date().getFullYear();
  const {t} = useTranslation();
  return (
    <div className="Copyrights">
      <p>{t("copyrights")} &copy; {t("name")} {year}</p>
    </div>
  );
}

export default Copyrights;
