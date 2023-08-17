import { useTranslation } from "react-i18next";
import "./CustomerDetails.css";
import { useEffect, useState } from "react";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { CustomerModel } from "../../../Models/Customer";
import CustomerCard from "../../Cards/CustomerCard/CustomerCard";

function CustomerDetails(): JSX.Element {
    const { t } = useTranslation();
  const [customer, setCustomer] = useState<CustomerModel>();
  useEffect(() => {
    webApiService
      .getCustomerDetails()
      .then((res) => {
        notifyService.success(t("got_cust_details", { ns: "messages" }));
        setCustomer(res.data);
      })
      .catch((err) => notifyService.error(err));
  }, []);
    return (
        <div className="CustomerDetails">
			<h2>{t("details", { ns: "customer" })}</h2>
            {customer !== undefined ? <CustomerCard customer={customer} /> : <></>}{" "}
        </div>
    );
}

export default CustomerDetails;
