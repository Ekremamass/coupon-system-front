import { Link } from "react-router-dom";
import "./CompanyMenu.css";
import { useTranslation } from "react-i18next";

function CompanyMenu(): JSX.Element {
    const {t} = useTranslation();
    return (
        <div className="CompanyMenu">
			<Link to={'/company/coupons'}>🎫  {t("list", { ns: "coupon" })}</Link>
			<Link to={'/company/addCoupon'}>➕  {t("add", { ns: "coupon" })}</Link>
			<Link to={'/company'}>🏢 {t("details", { ns: "company" })}</Link>
        </div>
    );
}

export default CompanyMenu;
