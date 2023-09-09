import { useDispatch } from "react-redux";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../Redux/AuthAppState";
import { removedCompaniesAction } from "../../../Redux/CompanyAppState";
import { useTranslation } from "react-i18next";
import { removedCouponsAction } from "../../../Redux/CouponAppState";
import { removedCustomersAction } from "../../../Redux/CustomerAppState";

function Logout(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const yes = () => {
    dispatch(userLoggedOut());
    dispatch(removedCompaniesAction());
    dispatch(removedCouponsAction());
    dispatch(removedCustomersAction());
    navigate("/login");
  };

  const no = () => {
    navigate(-1);
  };

  return (
    <div className="Logout ">
      <h2>{t("logout", { ns: "login" })}</h2>
      <p>{t("logout_q", { ns: "login" })} ?</p>
      <div className="row">
        <button onClick={yes} className="danger">
          {t("yes")}
        </button>
        <button onClick={no}>{t("cancel")}</button>
      </div>
    </div>
  );
}

export default Logout;
