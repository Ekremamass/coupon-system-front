import { Link } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
    return (
        <div className="CustomerMenu">
			<Link to={'/customer/coupons'}>🎫 Purchased Coupons</Link>
			<Link to={'/customer/purchase'}>🎫 Purchase Coupon</Link>
			<Link to={'/customer'}>💁 Customer Details</Link>
        </div>
    );
}

export default CustomerMenu;
