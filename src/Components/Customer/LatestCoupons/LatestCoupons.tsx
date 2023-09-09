import "./LatestCoupons.css";
import { useEffect, useState } from "react";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useTranslation } from "react-i18next";
import { CouponModel } from "../../../Models/Coupon";
import CouponCard from "../../Cards/CouponCard/CouponCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";

function LatestCoupons(): JSX.Element {
  const { t } = useTranslation();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (coupons.length > 0) {
        const nextIndex = (currentIndex + 1) % coupons.length;
        setCurrentIndex(nextIndex);
      }
    }, 5000); // Change coupon every 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, coupons]);

  useEffect(() => {
    webApiService
      .getLatestCoupons()
      .then((res) => {
        console.log(res);
        setCoupons(res.data);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  const handleNext = () => {
    if (coupons.length > 0) {
      const nextIndex = (currentIndex + 1) % coupons.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (coupons.length > 0) {
      const prevIndex = (currentIndex - 1 + coupons.length) % coupons.length;
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="LatestCoupons">
      {coupons.length > 0 ? (
        <div className="title-coupon">
          <h1>{t("latest", { ns: "coupon" })}</h1>
          <div className="coupon-container">
            <button onClick={handlePrevious}>{t("previous")}</button>
            <CouponCard coupon={coupons[currentIndex]} />
            <button onClick={handleNext}>{t("next")}</button>
          </div>
        </div>
      ) : (
        <EmptyView
          title={t("empty")}
          description={t("empty", { ns: "coupon" })}
        />
      )}
    </div>
  );
}

export default LatestCoupons;
