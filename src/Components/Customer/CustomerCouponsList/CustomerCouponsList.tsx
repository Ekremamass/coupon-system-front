import "./CustomerCouponsList.css";
import { useDispatch } from "react-redux";
import { Category, CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import * as zod from "zod";
import { useEffect, useState } from "react";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CouponCard from "../../Cards/CouponCard/CouponCard";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function CustomerCouponsList(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const [inputValue, setInputValue] = useState("");


  const clearInput = () => {
    setInputValue("");
  };

  const fetchData = () => {
    clearInput();
    webApiService
      .getCustomerCoupons()
      .then((res) => {
        notifyService.success(t("got_purchased", { ns: "messages" }));
        setCoupons(res.data);
        dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => notifyService.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const schema = zod.object({
    category: zod.string().optional(),
    max: zod.number().optional(),
  });

  type FormData = {
    category: Category;
    max: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const [activeForm, setActiveForm] = useState<"category" | "max">("category");

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (activeForm === "category") {
      webApiService
        .getCusCouponsByCategory(data.category)
        .then((res) => {
          notifyService.success(
            t("got_coupons_cat", { ns: "messages" }) + " " + data.category
          );
          setCoupons(res.data);
          dispatch(gotAllCouponsAction(res.data));
        })
        .catch((err) => notifyService.error(err));
    } else if (activeForm === "max") {
      console.log(data.max);
      webApiService
        .getCusCouponsByMaxPrice(data.max)
        .then((res) => {
          notifyService.success(
            t("got_coupons_max", { ns: "messages" }) + " " + data.max
          );
          setCoupons(res.data);
          dispatch(gotAllCouponsAction(res.data));
        })
        .catch((err) => notifyService.error(err));
    }
  };
  return (
    <div className="CustomerCouponsList">
      <h2>{t("purchased", { ns: "customer" })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="buttons">
          <button
            type="button"
            onClick={() => setActiveForm("category")}
            disabled={activeForm === "category"}
          >
            {t("choose_cat", { ns: "coupon" })}
          </button>
          <button
            type="button"
            onClick={() => setActiveForm("max")}
            disabled={activeForm === "max"}
          >
            {t("enter_max", { ns: "coupon" })}
          </button>

          {activeForm === "category" ? (
            <>
              {errors?.category ? (
                <span>{errors.category.message}</span>
              ) : (
                <label htmlFor="category">{t("category", { ns: "coupon" })} </label>
              )}
              <select
                {...register("category")}
                name="category"
                placeholder="Category"
              >
                {Object.values(Category).map((categoryValue, index) => (
                  <option key={index} value={categoryValue}>
                    {categoryValue}
                  </option>
                ))}
              </select>
            </>
          ) : null}

          {activeForm === "max" ? (
            <>
              {errors?.max ? (
                <span>{errors.max.message}</span>
              ) : (
                <label htmlFor="max">{t("max", { ns: "coupon" })} </label>
              )}
              <input
                {...register("max", { valueAsNumber: true })}
                name="max"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Max"
              />
            </>
          ) : null}
          <button type="submit" disabled={!isValid || isSubmitting}>
          {t("get", { ns: "coupon" })}
        </button>
        </div>
      </form>
      <br />
      <button type="button" onClick={fetchData}>{t("clear", { ns: "coupon" })}</button>
      <br />
      {coupons.length !== 0 ? (
        coupons.map((c, idx) => (
          <CouponCard key={`coupon-card-${idx}`} coupon={c} />
        ))
      ) : (
        <EmptyView
          title={t("empty")}
          description={t("empty", { ns: "coupon" })}
        />
      )}
    </div>
  );
}

export default CustomerCouponsList;
