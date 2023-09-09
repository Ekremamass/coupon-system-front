import { Link, useLocation } from "react-router-dom";
import { Category, CouponModel } from "../../../Models/Coupon";
import "./CouponCard.css";
import moment from "moment";
import store from "../../../Redux/Store";
import { ClientType } from "../../../Models/Login";
import { useTranslation } from "react-i18next";

interface CouponCardProps {
  coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const isCompany =
    store.getState().authReducer.user.clientType === ClientType.COMPANY && location.pathname === "/company/coupons";
  const isCustomer =
    store.getState().authReducer.user.clientType === ClientType.CUSTOMER;
  const isPurchase = location.pathname === "/customer/all" || location.pathname === "/home" ;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const notPurchasable =
    props.coupon.amount === 0 || props.coupon.endDate < today ;
    
  return (
    <div className="CouponCard card">
      <div className="title-and-image">
        <h3 className="title">
          {`${props.coupon.title} (#${props.coupon.id})`}{" "}
        </h3>
        <img
          className="CouponImage"
          src={props.coupon.image}
          alt={`${props.coupon.title} Image`}
        />
      </div>
      <p>
        🏢&nbsp;{t("company", { ns: "coupon" })} : {props.coupon.company.name}
      </p>
      <p>
        {props.coupon.category === Category.FOOD ? (
          <span>🍔</span>
        ) : props.coupon.category === Category.ELECTRICITY ? (
          <span>📱</span>
        ) : props.coupon.category === Category.RESTAURANT ? (
          <span>🍽️</span>
        ) : (
          <span>🏖️</span>
        )}
        &nbsp;{t("category", { ns: "coupon" })} : {props.coupon.category}
      </p>
      <p>
        🔢&nbsp;{t("amount", { ns: "coupon" })} : {props.coupon.amount}
      </p>
      <p>
        💲&nbsp;{t("price", { ns: "coupon" })} : {props.coupon.price}&#8362;
      </p>
      <div className="detailsContainer">
        <p>
          📙&nbsp;{t("description", { ns: "coupon" })} :{" "}
          {props.coupon.description}
        </p>
        <p>
          📅&nbsp;{t("startDate", { ns: "coupon" })} :{" "}
          {moment(props.coupon.startDate).format("DD/MM/YY")}
        </p>
        <p>
          📅&nbsp;{t("endDate", { ns: "coupon" })} :{" "}
          {moment(props.coupon.endDate).format("DD/MM/YY")}
        </p>

      {isCompany && (
        <div className="row ">
          <Link to={`/company/updateCoupon/${props.coupon.id}`}>
            <button>✏️ {t("edit", { ns: "coupon" })}</button>
          </Link>
          <Link to={`/company/deleteCoupon/${props.coupon.id}`}>
            {" "}
            <button>🗑️ {t("delete", { ns: "coupon" })}</button>
          </Link>
        </div>
      )}

      {isCustomer && isPurchase && (
        <Link to={`/customer/purchase/${props.coupon.id}`}>
          <button disabled={notPurchasable}>
            🤑 {t("purchase", { ns: "customer" })}
          </button>
        </Link>
      )}
      </div>
    </div>
  );
}

export default CouponCard;
