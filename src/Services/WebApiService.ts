import { Category } from "./../Models/Coupon";
import axios, { AxiosResponse } from "axios";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import urlService from "./UrlService";
import { CompanyModel } from "../Models/Company";
import { CustomerModel } from "../Models/Customer";
import store from "../Redux/Store";
import { CouponModel } from "../Models/Coupon";

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

  public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CompanyModel[]>(urlService.admin + "/companies", {
      headers,
    });
  }

  public getOneCompany(id: number): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CompanyModel>(urlService.admin + "/company/" + id, {
      headers,
    });
  }

  public addCompany(data: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.post<any>(urlService.admin + "/company", data, { headers });
  }

  public updateCompany(
    id: number,
    company: CompanyModel
  ): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.put(`${urlService.admin}/company/${id}`, company, { headers });
  }

  public deleteCompany(id: number): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.delete(`${urlService.admin}/company/${id}`, { headers });
  }

  public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CustomerModel[]>(urlService.admin + "/customers", {
      headers,
    });
  }

  public addCustomer(
    data: CustomerModel
  ): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.post<any>(urlService.admin + "/customer", data, { headers });
  }

  updateCustomer(
    id: number,
    customer: CustomerModel
  ): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.put(`${urlService.admin}/customer/${id}`, customer, {
      headers,
    });
    throw new Error("Method not implemented.");
  }

  public deleteCustomer(id: number): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.delete(`${urlService.admin}/customer/${id}`, { headers });
  }

  public getOneCustomer(id: number): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CustomerModel>(urlService.admin + "/customer/" + id, {
      headers,
    });
  }

  public getCompanyCoupons(): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(urlService.company + "/coupons", {
      headers,
    });
  }

  public addCoupon(data: CouponModel): Promise<AxiosResponse<CouponModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.post<any>(urlService.company + "/coupon", data, { headers });
  }

  public deleteCoupon(id: number): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.delete(`${urlService.company}/coupon/${id}`, { headers });
  }

  public updateCoupon(
    id: number,
    coupon: CouponModel
  ): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.put(`${urlService.company}/coupon/${id}`, coupon, { headers });
  }

  public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get(`${urlService.company}/details`, { headers });
  }

  public getCouponsByCategory(
    category: Category
  ): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(
      urlService.company + "/coupons/category" + "?category=" + category,
      { headers }
    );
  }

  public getCouponsByMaxPrice(
    max: number
  ): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(
      urlService.company + "/coupons/maxPrice" + "?maxPrice=" + max,
      { headers }
    );
  }

  public getCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(urlService.customer + "/coupons", {
      headers,
    });
  }

  public getCusCouponsByCategory(
    category: Category
  ): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(
      urlService.customer + "/coupons/category" + "?category=" + category,
      { headers }
    );
  }

  public getCusCouponsByMaxPrice(
    max: number
  ): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(
      urlService.customer + "/coupons/maxPrice" + "?maxPrice=" + max,
      { headers }
    );
  }

  public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get(`${urlService.customer}/details`, { headers });
  }

  public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.get<CouponModel[]>(urlService.customer + "/all", { headers });
  }

  public purchaseCoupon(id: number): Promise<AxiosResponse<void>> {
    const headers = { Authorization: store.getState().authReducer.user.token };
    return axios.post(`${urlService.customer}/purchase/${id}`, null ,{ headers });
  }

  public getLatestCoupons(): Promise<AxiosResponse<CouponModel[]>> {
    return axios.get<CouponModel[]>(urlService.customer + "/latest");
  }

}

const webApiService = new WebApiService();
export default webApiService;
