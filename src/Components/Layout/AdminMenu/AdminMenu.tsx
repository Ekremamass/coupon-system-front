import { Link } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
  return (
    <div className="AdminMenu">
      <Link to={"/admin/companies"}>🏢 Companies List</Link>
      <Link to={"/admin/addCompany"}>➕ Add Company</Link>
      <Link to={"/admin/getCompany"}>🏢 One Company</Link>
      <Link to={"/admin/customers"}>💁 Customers List</Link>
      <Link to={"/admin/addCustomer"}>➕ Add Customer</Link>
      <Link to={"/admin/getCustomer"}>💁 One Customer</Link>      
    </div>
  );
}

export default AdminMenu;
