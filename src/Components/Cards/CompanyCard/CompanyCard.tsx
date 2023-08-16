import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import "./CompanyCard.css";
import { useTranslation } from "react-i18next";
import store from "../../../Redux/Store";
import { ClientType } from "../../../Models/Login";

interface CompanyCardProps {
  company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  const isAdmin =
    store.getState().authReducer.user.clientType === ClientType.ADMINISTRATOR;
  const { t } = useTranslation();
  return (
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
  );
}

export default CompanyCard;
