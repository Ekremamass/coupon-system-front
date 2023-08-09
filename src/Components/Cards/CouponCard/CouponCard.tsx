import { Link } from "react-router-dom";
import { Category, CouponModel } from "../../../Models/Coupon";
import "./CouponCard.css";
import moment from "moment";

interface CouponCardProps {
  coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
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
      <p>📙&nbsp;description : {props.coupon.description}</p>
      <p>🏢&nbsp;company : {props.coupon.company.name}</p>
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
        &nbsp;category : {props.coupon.category}
      </p>
      <p>🔢&nbsp;amount : {props.coupon.amount}</p>
      <p>💲&nbsp;price : {props.coupon.price}&#8362;</p>
      <p>
        📅&nbsp;start date : {moment(props.coupon.startDate).format("DD/MM/yy")}
      </p>
      <p>
        📅&nbsp;end date : {moment(props.coupon.endDate).format("DD/MM/yy")}
      </p>

      <hr />
      <div className="row ">
        <Link to={`/company/updateCoupon/${props.coupon.id}`}>
          <button>✏️ Edit Coupon</button>
        </Link>
        <Link to={`/company/deleteCoupon/${props.coupon.id}`}>
          {" "}
          <button>🗑️ Delete Coupon</button>
        </Link>
      </div>
    </div>
  );
}

export default CouponCard;
