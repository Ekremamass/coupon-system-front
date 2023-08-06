import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import "./CustomerCard.css";

interface CustomerCardProps {
  customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
  return (
    <div className="CustomerCard card">
      <h3>{`${props.customer.firstName} ${props.customer.lastName} (#${props.customer.id})`} </h3>
      <p>📧&nbsp;email : {props.customer.email}</p>
      <p>🔒&nbsp;password : {props.customer.password}</p>
      <hr />
      <div className="row">
        <Link to={`/admin/updateCustomer/${props.customer.id}`}>
          <button>✏️ Edit Customer</button>
        </Link>
        <Link to={`/admin/deleteCustomer/${props.customer.id}`}>
          {" "}
          <button>🗑️ Delete Customer</button>
        </Link>
      </div>
    </div>
  );
}

export default CustomerCard;
