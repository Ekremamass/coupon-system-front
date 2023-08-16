import { useSelector } from "react-redux";
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
import DeleteCoupon from "../../Company/DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../../Company/UpdateCoupon/UpdateCoupon";
import CustomerDetails from "../../Customer/CustomerDetails/CustomerDetails";
import PurchaseCoupon from "../../Customer/PurchaseCoupon/PurchaseCoupon";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import "./Routing.css";
import { Route, Routes } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import { ClientType } from "../../../Models/Login";
import CustomerCouponsList from "../../Customer/CustomerCouponsList/CustomerCouponsList";
import AllCoupons from "../../Customer/AllCoupons/AllCoupons";

function Routing(): JSX.Element {
    const clientType = useSelector((state:RootState)=>state.authReducer.user.clientType);
    const isAdmin = clientType === ClientType.ADMINISTRATOR;
    const isCompany = clientType === ClientType.COMPANY;
    const isCustomer = clientType === ClientType.CUSTOMER;
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
                { <Route path="/admin/companies" element={<CompanyList/>} />}
                {isAdmin && <Route path="/admin/addCompany" element={<AddCompany/>} />}
                {isAdmin && <Route path="/admin/getCompany" element={<GetCompany/>} />}
                {isAdmin && <Route path="/admin/deleteCompany/:id" element={<DeleteCompany/>} />}
                {isAdmin && <Route path="/admin/updateCompany/:id" element={<UpdateCompany/>} />}
                {isAdmin && <Route path="/admin/customers" element={<CustomerList/>} />}
                {isAdmin && <Route path="/admin/addCustomer" element={<AddCustomer/>} />}
                {isAdmin && <Route path="/admin/getCustomer" element={<GetCustomer/>} />}
                {isAdmin && <Route path="/admin/deleteCustomer/:id" element={<DeleteCustomer/>} />}
                {isAdmin && <Route path="/admin/updateCustomer/:id" element={<UpdateCustomer/>} />}
                {/* Company routes */}
                {isCompany && <Route path="/company/addCoupon" element={<AddCoupon/>} />}
                {isCompany&& <Route path="/company/coupons" element={<CouponList/>} />}
                {isCompany&& <Route path="/company/deleteCoupon/:id" element={<DeleteCoupon/>} />}
                {isCompany&& <Route path="/company/updateCoupon/:id" element={<UpdateCoupon/>} />}
                {isCompany&& <Route path="/company" element={<CompanyDetails/>} />}
                {/* Customer routes */}
                {isCustomer && <Route path="/customer/coupons" element={<CustomerCouponsList/>} />}
                {isCustomer && <Route path="/customer" element={<CustomerDetails/>} />}
                {isCustomer && <Route path="/customer/purchase/:id" element={<PurchaseCoupon/>} />}
                {isCustomer && <Route path="/customer/all" element={<AllCoupons/>} />}

                <Route path="/*" element={<Page404/>} />

            </Routes>
        </div>
    );
}

export default Routing;
