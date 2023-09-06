import "./AllCoupons.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import { useDispatch } from "react-redux";
import CouponCard from "../../Cards/CouponCard/CouponCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";

function AllCoupons(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );

  useEffect(() => {
    webApiService
      .getAllCoupons()
      .then((res) => {
        notifyService.success(t("got_coupons", { ns: "messages" }));
        setCoupons(res.data);
        dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => notifyService.error(err));
  }, []);

  return (
    <div className="AllCoupons card-container">
        {coupons.length !== 0 ? (
          coupons.map((c, idx) => (
            <CouponCard key={`coupon-card-${idx}`} coupon={c} />
          ))
        ) : (
          <EmptyView
            title={t("empty")}
            description={t("empty", { ns: "coupon" })}
          />
        )}
    </div>
  );
}

export default AllCoupons;
