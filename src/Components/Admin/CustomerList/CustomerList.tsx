import "./CustomerList.css";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import { CustomerModel } from "../../../Models/Customer";
import { gotAllCustomersAction } from "../../../Redux/CustomerAppState";
import CustomerCard from "../../Cards/CustomerCard/CustomerCard";
import { useTranslation } from "react-i18next";

function CustomerList(): JSX.Element {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customersReducer.customers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.getState().customersReducer.isLoaded) {
      return;
    }
    webApiService
      .getAllCustomers()
      .then((res) => {
        notifyService.success(t("got_all_cus", { ns: "messages" }));
        setCustomers(res.data);
        dispatch(gotAllCustomersAction(res.data));
      })
      .catch((err) => {
        notifyService.error(err);
        console.log(err);
      });
  }, []);
  return (
    <div className="CustomerList">
      <h2>{t("title", { ns: "customer" })}</h2>

      <div className="card-container">
        {customers.length !== 0 ? (
          customers.map((c, idx) => (
            <CustomerCard key={`customer-card-${idx}`} customer={c} />
          ))
        ) : (
          <EmptyView
            title={"No Items Found"}
            description={t("empty", { ns: "customer" })}
          />
        )}
      </div>
    </div>
  );
}

export default CustomerList;
