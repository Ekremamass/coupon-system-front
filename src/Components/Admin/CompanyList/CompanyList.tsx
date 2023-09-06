import { useEffect, useState } from "react";
import "./CompanyList.css";
import { CompanyModel } from "../../../Models/Company";
import store from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { gotAllCompaniesAction } from "../../../Redux/CompanyAppState";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import { useTranslation } from "react-i18next";

function CompanyList(): JSX.Element {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );
  const dispatch = useDispatch();
  const isLoaded = store.getState().companiesReducer.isLoaded;

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    webApiService
      .getAllCompanies()
      .then((res) => {
        notifyService.success(t("got_all_comp", { ns: "messages" }));
        setCompanies(res.data);
        dispatch(gotAllCompaniesAction(res.data));
      })
      .catch((err) => notifyService.error(err));
  }, []);
  return (
    <div className="CompanyList">
      <h2>{t("title", { ns: "company" })}</h2>

      <div className="card-container">
        {companies.length !== 0 ? (
          companies.map((c, idx) => (
            <CompanyCard key={`company-card-${idx}`} company={c} />
          ))
        ) : (
          <EmptyView
            title={t("empty")}
            description={t("empty", { ns: "company" })}
          />
        )}
      </div>
    </div>
  );
}

export default CompanyList;
