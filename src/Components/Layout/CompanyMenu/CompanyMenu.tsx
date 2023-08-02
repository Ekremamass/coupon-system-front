import { Link } from "react-router-dom";
import "./CompanyMenu.css";

function CompanyMenu(): JSX.Element {
    return (
        <div className="CompanyMenu">
			<Link to={'/company/coupons'}>🎫 Coupons List</Link>
			<Link to={'/company/addCoupon'}>➕ Add Coupon</Link>
			<Link to={'/company'}>🏢 Company Details</Link>
        </div>
    );
}

export default CompanyMenu;
