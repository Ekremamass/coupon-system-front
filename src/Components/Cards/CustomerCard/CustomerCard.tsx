import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import "./CustomerCard.css";
import { useTranslation } from "react-i18next";
import { ClientType } from "../../../Models/Login";
import store from "../../../Redux/Store";
import { Tilt } from "react-tilt";

interface CustomerCardProps {
  customer: CustomerModel;
}

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function CustomerCard(props: CustomerCardProps): JSX.Element {
  const isAdmin =
    store.getState().authReducer.user.clientType === ClientType.ADMINISTRATOR;
  const { t } = useTranslation();
  return (
    <Tilt options={defaultOptions} style={{ height: 250, width: 300 }}>
      <div className="CustomerCard card">
        <h3>
          {`${props.customer.firstName} ${props.customer.lastName} (#${props.customer.id})`}{" "}
        </h3>
        <p>
          📧&nbsp;{t("email", { ns: "login" })} : {props.customer.email}
        </p>
        <p>
          🔒&nbsp;{t("password", { ns: "login" })} : {props.customer.password}
        </p>
        {isAdmin && (
          <div className="row">
            <Link to={`/admin/updateCustomer/${props.customer.id}`}>
              <button>✏️ {t("edit", { ns: "customer" })}</button>
            </Link>
            <Link to={`/admin/deleteCustomer/${props.customer.id}`}>
              {" "}
              <button>🗑️ {t("delete", { ns: "customer" })}</button>
            </Link>
          </div>
        )}
      </div>
    </Tilt>
  );
}

export default CustomerCard;
