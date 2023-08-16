import { useTranslation } from "react-i18next";
import "./CompanyDetails.css";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/Company";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";

function CompanyDetails(): JSX.Element {
  const { t } = useTranslation();
  const [company, setCompany] = useState<CompanyModel>();
  useEffect(() => {
    webApiService
      .getCompanyDetails()
      .then((res) => {
        notifyService.success(t("got_comp_details", { ns: "messages" }));
        setCompany(res.data);
      })
      .catch((err) => notifyService.error(err));
  }, []);
  return (
    <div className="CompanyDetails">
      <h2>{t("details", { ns: "company" })}</h2>
      {company !== undefined ? <CompanyCard company={company} /> : <></>}{" "}
    </div>
  );
}

export default CompanyDetails;
