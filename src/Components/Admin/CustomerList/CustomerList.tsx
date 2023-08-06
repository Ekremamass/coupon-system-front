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

function CustomerList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customersReducer.customers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    webApiService
      .getAllCustomers()
      .then((res) => {
        notifyService.success("got all customers");
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
      <h1>Customers List</h1>

      {customers.length !== 0 ? (
        customers.map((c, idx) => (
          <CustomerCard key={`customer-card-${idx}`} customer={c} />
        ))
      ) : (
        <EmptyView
          title={"No Items Found"}
          description={"there are no customers right now"}
        />
      )}
    </div>
  );
}

export default CustomerList;
