import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import "./CompanyCard.css";
import { useTranslation } from "react-i18next";
import store from "../../../Redux/Store";
import { ClientType } from "../../../Models/Login";
import { Tilt } from "react-tilt";

interface CompanyCardProps {
  company: CompanyModel;
}

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function CompanyCard(props: CompanyCardProps): JSX.Element {
  const isAdmin =
    store.getState().authReducer.user.clientType === ClientType.ADMINISTRATOR;
  const { t } = useTranslation();
  return (
    <Tilt options={defaultOptions} style={{ height: 250, width: 300 }}>
      <div className="CompanyCard card">
        <h3>{`${props.company.name} (#${props.company.id})`} </h3>
        <p>
          📧&nbsp;{t("email", { ns: "login" })} : {props.company.email}
        </p>
        <p>
          🔒&nbsp;{t("password", { ns: "login" })} : {props.company.password}
        </p>
        {isAdmin && (
          <div className="row">
            <Link to={`/admin/updateCompany/${props.company.id}`}>
              <button>✏️ {t("edit", { ns: "company" })}</button>
            </Link>
            <Link to={`/admin/deleteCompany/${props.company.id}`}>
              {" "}
              <button>🗑️ {t("delete", { ns: "company" })}</button>
            </Link>
          </div>
        )}
      </div>
    </Tilt>
  );
}

export default CompanyCard;
