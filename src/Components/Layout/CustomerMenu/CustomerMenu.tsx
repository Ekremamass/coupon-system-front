import { Link } from "react-router-dom";
import "./CustomerMenu.css";
import { useTranslation } from "react-i18next";

function CustomerMenu(): JSX.Element {
    const {t} = useTranslation();
    return (
        <div className="CustomerMenu">
			<Link to={'/customer/coupons'}>🎫 {t("purchased", { ns: "customer" })}</Link>
			<Link to={'/customer/all'}>🎫  {t("all", { ns: "customer" })}</Link>
			<Link to={'/customer'}>💁  {t("details", { ns: "customer" })}</Link>
        </div>
    );
}

export default CustomerMenu;
