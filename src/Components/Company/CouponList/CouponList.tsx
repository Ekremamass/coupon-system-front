import { useDispatch } from "react-redux";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import "./CouponList.css";
import { useEffect, useState } from "react";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CouponCard from "../../Cards/CouponCard/CouponCard";

function CouponList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const dispatch = useDispatch();

  useEffect(() => {
    webApiService
      .getCompanyCoupons()
      .then((res) => {
        notifyService.success("got company coupons");
        setCoupons(res.data);
        console.log(res.data);
        dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => notifyService.error(err));
  }, []);
  
  return(
  <div className="CouponList">
    <h1>Companies List</h1>

{coupons.length !== 0 ? (
  coupons.map((c, idx) => (
    <CouponCard key={`coupon-card-${idx}`} coupon={c} />
  ))
) : (
  <EmptyView
    title={"No Items Found"}
    description={"there are no coupons right now"}
  />
)}
  </div>
  );
}

export default CouponList;
