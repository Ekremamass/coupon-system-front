import axios, { AxiosResponse } from "axios";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import urlService from "./UrlService";
import { CompanyModel } from "../Models/Company";
import { CustomerModel } from "../Models/Customer";
import store from "../Redux/Store";

class WebApiService {

    public login(data: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
        return axios.post<LoginResModel>(urlService.auth + "/login", data);
    }
    
    public registerCompany(data: CompanyModel): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register/company", data);
    }

    public registerCustomer(data: CustomerModel): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register/customer", data);
    }

    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>>{
        const headers = { 'Authorization': store.getState().authReducer.user.token };
        return axios.get<CompanyModel[]>(urlService.admin + "/companies",{headers});
    }

}

const webApiService = new WebApiService();
export default webApiService;