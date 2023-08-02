import App from "../../../App";
import AddCompany from "../../Admin/AddCompany/AddCompany";
import AddCustomer from "../../Admin/AddCustomer/AddCustomer";
import CompanyList from "../../Admin/CompanyList/CompanyList";
import CustomerList from "../../Admin/CustomerList/CustomerList";
import DeleteCompany from "../../Admin/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../Admin/DeleteCustomer/DeleteCustomer";
import GetCompany from "../../Admin/GetCompany/GetCompany";
import GetCustomer from "../../Admin/GetCustomer/GetCustomer";
import UpdateCompany from "../../Admin/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../Admin/UpdateCustomer/UpdateCustomer";
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";
import Register from "../../Auth/Register/Register";
import AddCoupon from "../../Company/AddCoupon/AddCoupon";
import CompanyDetails from "../../Company/CompanyDetails/CompanyDetails";
import CouponList from "../../Company/CouponList/CouponList";
import CouponListByCategory from "../../Company/CouponListByCategory/CouponListByCategory";
import CouponListByMaxPrice from "../../Company/CouponListByMaxPrice/CouponListByMaxPrice";
import DeleteCoupon from "../../Company/DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../../Company/UpdateCoupon/UpdateCoupon";
import CouponsList from "../../Customer/CouponsList/CouponsList";
import CouponsListByCategory from "../../Customer/CouponsListByCategory/CouponsListByCategory";
import CouponsListByMaxPrice from "../../Customer/CouponsListByMaxPrice/CouponsListByMaxPrice";
import CustomerDetails from "../../Customer/CustomerDetails/CustomerDetails";
import PurchaseCoupon from "../../Customer/PurchaseCoupon/PurchaseCoupon";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import "./Routing.css";
import { Route, Routes } from "react-router-dom";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/home" element={<Home/>} />
                <Route index element={<Home/>} />
                <Route path="/about" element={<About/>} />
                {/* Auth routes */}
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/register" element={<Register/>} />
                {/* Admin routes */}
                <Route path="/admin/companies" element={<CompanyList/>} />
                <Route path="/admin/addCompany" element={<AddCompany/>} />
                <Route path="/admin/getCompany" element={<GetCompany/>} />
                <Route path="/admin/deleteCompany/:id" element={<DeleteCompany/>} />
                <Route path="/admin/updateCompany/:id" element={<UpdateCompany/>} />
                <Route path="/admin/customers" element={<CustomerList/>} />
                <Route path="/admin/addCustomer" element={<AddCustomer/>} />
                <Route path="/admin/getCustomer" element={<GetCustomer/>} />
                <Route path="/admin/deleteCustomer/:id" element={<DeleteCustomer/>} />
                <Route path="/admin/updateCustomer/:id" element={<UpdateCustomer/>} />
                {/* Company routes */}
                <Route path="/company/addCoupon" element={<AddCoupon/>} />
                <Route path="/company/coupons" element={<CouponList/>} />
                <Route path="/company/category" element={<CouponListByCategory/>} />
                <Route path="/company/maxPrice" element={<CouponListByMaxPrice/>} />
                <Route path="/company/deleteCoupon/:id" element={<DeleteCoupon/>} />
                <Route path="/company/updateCoupon/:id" element={<UpdateCoupon/>} />
                <Route path="/company" element={<CompanyDetails/>} />
                {/* Customer routes */}
                <Route path="/customer/coupons" element={<CouponsList/>} />
                <Route path="/customer/category" element={<CouponsListByCategory/>} />
                <Route path="/customer/maxPrice" element={<CouponsListByMaxPrice/>} />
                <Route path="/customer" element={<CustomerDetails/>} />
                <Route path="/customer/purchase/" element={<PurchaseCoupon/>} />

                <Route path="/*" element={<Page404/>} />

            </Routes>
        </div>
    );
}

export default Routing;
