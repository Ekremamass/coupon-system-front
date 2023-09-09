import "./AllCoupons.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import { useDispatch } from "react-redux";
import CouponCard from "../../Cards/CouponCard/CouponCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import ReactPaginate from "react-paginate";

function AllCoupons(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (store.getState().customersReducer.isLoaded) {
      return;
    }
    webApiService
      .getAllCoupons()
      .then((res) => {
        notifyService.success(t("got_coupons", { ns: "messages" }));
        setCoupons(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => notifyService.error(err));
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = coupons.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="AllCoupons">
      <div className="card-container">
        {coupons.length !== 0 ? (
          subset.map((c, idx) => (
            <CouponCard key={`coupon-card-${idx}`} coupon={c} />
          ))
        ) : (
          <EmptyView
            title={t("empty")}
            description={t("empty", { ns: "coupon" })}
          />
        )}
      </div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        breakLabel={"..."}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
      />
    </div>
  );
}

export default AllCoupons;
