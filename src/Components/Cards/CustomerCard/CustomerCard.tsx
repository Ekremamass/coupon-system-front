import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import "./CustomerCard.css";
import { useTranslation } from "react-i18next";

interface CustomerCardProps {
  customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
  const {t} = useTranslation();
  return (
    <div className="CustomerCard card">
      <h3>{`${props.customer.firstName} ${props.customer.lastName} (#${props.customer.id})`} </h3>
      <p>📧&nbsp;{t('email', { ns: 'login' })} : {props.customer.email}</p>
      <p>🔒&nbsp;{t('password', { ns: 'login' })} : {props.customer.password}</p>
      <hr />
      <div className="row">
        <Link to={`/admin/updateCustomer/${props.customer.id}`}>
          <button>✏️ {t('edit', { ns: 'customer' })}</button>
        </Link>
        <Link to={`/admin/deleteCustomer/${props.customer.id}`}>
          {" "}
          <button>🗑️ {t('delete', { ns: 'customer' })}</button>
        </Link>
      </div>
    </div>
  );
}

export default CustomerCard;
