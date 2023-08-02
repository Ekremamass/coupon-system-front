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

function CompanyList(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>(
        store.getState().companiesReducer.companies
      );
      const dispatch = useDispatch();
    
      useEffect(() => {
        if (companies.length > 0) {
          return;
        }
        webApiService
          .getAllCompanies()
          .then((res) => {
            notifyService.success("got all companies");
            setCompanies(res.data);
            dispatch(gotAllCompaniesAction(res.data));
          })
          .catch((err) => notifyService.error(err));
      }, []);
  return (
    <div className="CompanyList">
      <h1>Companies List</h1>

      {companies.length !== 0 ? (
        companies.map((c, idx) => (
          <CompanyCard key={`company-card-${idx}`} company={c} />
        ))
      ) : (
        <EmptyView
          title={"No Items Found"}
          description={"there are no companies right now"}
        />
      )}
    </div>
  );
}

export default CompanyList;
