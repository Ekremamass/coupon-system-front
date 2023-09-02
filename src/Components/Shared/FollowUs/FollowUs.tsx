import { useTranslation } from "react-i18next";
import "./FollowUs.css";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

function FollowUs(): JSX.Element {
  const {t} = useTranslation();
  return (
    <div className="FollowUs">
      <div>
        <h3>{t("follow")}</h3>
      </div>
      <div className="row">
        <a href="https://www.linkedin.com/in/ekrema-massarwe-589693250/">
          <AiFillLinkedin size={36} />
        </a>
        <a href="https://github.com/Ekremamass">
          <AiFillGithub size={36} />
        </a>
        <a href="https://twitter.com/EkremaMass">
          <AiFillTwitterSquare size={36} />
        </a>
      </div>
    </div>
  );
}

export default FollowUs;
