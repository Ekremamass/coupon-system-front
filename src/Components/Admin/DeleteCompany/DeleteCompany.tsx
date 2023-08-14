import { useDispatch } from "react-redux";
import "./DeleteCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import { useTranslation } from "react-i18next";

function DeleteCompany(): JSX.Element {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    webApiService
      .deleteCompany(id)
      .then(() => {
        notifyService.success(`${t("deleted_comp", { ns: "messages" })}${id}`);
        dispatch(deletedCompanyAction(id));
        navigate(-1);
      })
      .catch((err) => notifyService.error(err));
  };

  const no = () => {
    navigate(-1);
  };
  return (
    <div className="DeleteCompany">
      <h1>{t("delete", { ns: "company" })}</h1>
      <p>{t("delete_q", { ns: "company" })} #{id}?</p>
      <div className="row">
        <button onClick={yes} className="danger">
        {t("yes")}
        </button>
        <button onClick={no}>{t("cancel")}</button>
      </div>
    </div>
  );
}

export default DeleteCompany;
