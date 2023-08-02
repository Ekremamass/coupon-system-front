import { useSelector } from "react-redux";
import "./Menu.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import AdminMenu from "../AdminMenu/AdminMenu";
import CompanyMenu from "../CompanyMenu/CompanyMenu";
import { ClientType } from "../../../Models/Login";
import CustomerMenu from "../CustomerMenu/CustomerMenu";

function Menu(): JSX.Element {
  const user = useSelector((state: RootState) => state.authReducer.user);

  return (
    <div className="Menu">
      <Link to={"/home"}>🏠 Home</Link>
      <Link to={"/about"}>🛈 About</Link>
      {user && user.clientType === ClientType.ADMINISTRATOR ? (
        <AdminMenu />
      ) : user && user.clientType === ClientType.COMPANY ? (
        <CompanyMenu />
      ) : user && user.clientType === ClientType.CUSTOMER ? (
        <CustomerMenu />
      ) : (
        <div>Login for more</div>
      )}
    </div>
  );
}

export default Menu;
