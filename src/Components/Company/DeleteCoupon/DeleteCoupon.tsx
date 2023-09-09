import { useDispatch } from "react-redux";
import "./DeleteCoupon.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { deletedCouponAction } from "../../../Redux/CouponAppState";

function DeleteCoupon(): JSX.Element {
    const dispatch = useDispatch();
  const {t} = useTranslation();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    webApiService
      .deleteCoupon(id)
      .then(() => {
        notifyService.success(`${t("deleted_coupon", { ns: "messages" })}${id}`);
        dispatch(deletedCouponAction(id));
        navigate(-1);
      })
      .catch((err) => {
        notifyService.error(err);
        navigate(-1)
      });
  };

  const no = () => {
    navigate(-1);
  };
  
    return (
        <div className="DeleteCoupon">
			<h2>{t("delete", { ns: "coupon" })}</h2>
      <p>{t("delete_q", { ns: "coupon" })} {id}?</p>
      <div className="row">
        <button onClick={yes} className="danger">
        {t("yes")}
        </button>
        <button onClick={no}>{t("cancel")}</button>
      </div>
        </div>
    );
}

export default DeleteCoupon;
