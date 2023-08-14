import "./DeleteCustomer.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState";
import { useTranslation } from "react-i18next";

function DeleteCustomer(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();

  const yes = () => {
    webApiService
      .deleteCustomer(id)
      .then(() => {
        notifyService.success(`${t('deleted_cus',{ns:'messages'})}${id}`);
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
      <h1>Delete Customer</h1>
      <p>{t('delete_q',{ns:'customer'})}{id}?</p>
      <div className="row">
        <button onClick={yes} className="danger">
        {t('yes')}
        </button>
        <button onClick={no}>{t('cancel')}</button>
      </div>
    </div>
  );
}

export default DeleteCustomer;
