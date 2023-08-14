import { Link } from "react-router-dom";
import "./AdminMenu.css";
import { useTranslation } from "react-i18next";

function AdminMenu(): JSX.Element {
  const {t} = useTranslation();
  return (
    <div className="AdminMenu">
      <Link to={"/admin/companies"}>🏢 {t("title", { ns: "company" })}</Link>
      <Link to={"/admin/addCompany"}>➕ {t("add", { ns: "company" })}</Link>
      <Link to={"/admin/getCompany"}>🏢 {t("one", { ns: "company" })}</Link>
      <Link to={"/admin/customers"}>💁 {t("title", { ns: "customer" })}</Link>
      <Link to={"/admin/addCustomer"}>➕ {t("add", { ns: "customer" })}</Link>
      <Link to={"/admin/getCustomer"}>💁 {t("one", { ns: "customer" })}</Link>      
    </div>
  );
}

export default AdminMenu;
