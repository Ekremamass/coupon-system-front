import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/Company";
import "./CompanyCard.css";

interface CompanyCardProps {
  company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  return (
    <div className="CompanyCard card">
      <h3>{`${props.company.name} (#${props.company.id})`} </h3>
      <p>📧&nbsp;email : {props.company.email}</p>
      <p>🔒&nbsp;password : {props.company.password}</p>
      <hr />
            <div className="row">

                <Link to={`/admin/updateCompany/${props.company.id}`}><button>✏️ Edit Company</button></Link>
                <Link to={`/todos/delete/${props.company.id}`}> <button>🗑️ Delete Company</button></Link>
            </div>
    </div>
  );
}

export default CompanyCard;
