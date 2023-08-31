import { useSelector } from "react-redux";
import "./Menu.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import AdminMenu from "../AdminMenu/AdminMenu";
import CompanyMenu from "../CompanyMenu/CompanyMenu";
import { ClientType } from "../../../Models/Login";
import CustomerMenu from "../CustomerMenu/CustomerMenu";
import { useTranslation } from "react-i18next";

function Menu(): JSX.Element {
  const {t} = useTranslation();
  const user = useSelector((state: RootState) => state.authReducer.user);

  return (
    <div className="Menu">
      <Link to={"/home"}>🏠 {t('home')}</Link>
      <Link to={"/about"}>🛈 {t('about')}</Link>
      {user && user.clientType === ClientType.ADMINISTRATOR ? (
        <AdminMenu />
      ) : user && user.clientType === ClientType.COMPANY ? (
        <CompanyMenu />
      ) : user && user.clientType === ClientType.CUSTOMER ? (
        <CustomerMenu />
      ) : (
      <p>{t('login')}</p>
      )}
    </div>
  );
}

export default Menu;
