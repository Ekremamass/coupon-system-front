import "./DeleteCustomer.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState";

function DeleteCustomer(): JSX.Element {
  const dispatch = useDispatch();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    webApiService
      .deleteCustomer(id)
      .then(() => {
        notifyService.success(`deleted company #${id} successfully`);
        dispatch(deletedCustomerAction(id));
        navigate(-1);
      })
      .catch((err) => notifyService.error(err));
  };

  const no = () => {
    navigate(-1);
  };
  return (
    <div className="DeleteCustomer">
      <h1>Delete Company</h1>
      <p>Are you sure you want to delete company #{id}?</p>
      <div className="row">
        <button onClick={yes} className="danger">
          Yes
        </button>
        <button onClick={no}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCustomer;
