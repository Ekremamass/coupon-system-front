import { useTranslation } from "react-i18next";
import "./PurchaseCoupon.css";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";

function PurchaseCoupon(): JSX.Element {
  const { t } = useTranslation();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    webApiService
      .purchaseCoupon(id)
      .then(() => {
        notifyService.success(
          `${t("purchased_coupon", { ns: "messages" })}${id}`
        );
        navigate("/customer/coupons");
      })
      .catch((err) => notifyService.error(err));
      navigate(-1)
  };

  const no = () => {
    navigate(-1);
  };
  return (
    <div className="PurchaseCoupon">
      <h2>{t("purchase", { ns: "customer" })}</h2>
      <p>
        {t("purchase_q", { ns: "customer" })} {id}?
      </p>
      <div className="row">
        <button onClick={yes}>{t("yes")}</button>
        <button onClick={no}>{t("cancel")}</button>
      </div>
    </div>
  );
}

export default PurchaseCoupon;
