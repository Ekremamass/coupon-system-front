import { useNavigate } from "react-router-dom";
import "./AddCoupon.css";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Category, CouponModel } from "../../../Models/Coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import webApiService from "../../../Services/WebApiService";
import { addedCouponAction } from "../../../Redux/CouponAppState";
import notifyService from "../../../Services/NotificationService";

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const schema = z.object({
    title: z.string().min(5).max(50).optional(),
    category: z.string().nullable(),
    description: z.string().min(10).max(200).optional(),
    amount: z.number().min(0).optional(),
    price: z.number().min(0).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(), 
    image: z.string().url().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CouponModel>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
    return webApiService
      .addCoupon(data)
      .then((res) => {
        console.log(res);
        dispatch(addedCouponAction(res.data));
        notifyService.success(t("added", { ns: "messages" }));
        navigate("/company/coupons");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCoupon">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.title ? (
          <span>{errors.title.message}</span>
        ) : (
          <label htmlFor="title">{t("title", { ns: "coupon" })}</label>
        )}
        <input
          {...register("title")}
          name="title"
          type="text"
          placeholder={t("title", { ns: "coupon" })}
        />

        {errors?.category ? (
          <span>{errors.category.message}</span>
        ) : (
          <label htmlFor="category">{t("category", { ns: "coupon" })}</label>
        )}
        <select
          {...register("category")}
          name="category"
          placeholder={t("category", { ns: "coupon" })}
        >
          {Object.values(Category).map((categoryValue, index) => (
            <option key={index} value={categoryValue}>
              {categoryValue}
            </option>
          ))}
        </select>

        {errors?.description ? (
          <span>{errors.description.message}</span>
        ) : (
          <label htmlFor="description">
            {t("description", { ns: "coupon" })}
          </label>
        )}
        <input
          {...register("description")}
          name="description"
          type="text"
          placeholder={t("description", { ns: "coupon" })}
        />

        {errors?.amount ? (
          <span>{errors.amount.message}</span>
        ) : (
          <label htmlFor="amount">{t("amount", { ns: "coupon" })}</label>
        )}
        <input
          {...register("amount", { valueAsNumber: true })}
          name="amount"
          type="number"
          placeholder={t("amount", { ns: "coupon" })}
        />

        {errors?.price ? (
          <span>{errors.price.message}</span>
        ) : (
          <label htmlFor="price">{t("price", { ns: "coupon" })}</label>
        )}
        <input
          {...register("price", { valueAsNumber: true })}
          name="price"
          type="number"
          placeholder={t("price", { ns: "coupon" })}
        />

        {errors?.startDate ? (
          <span>{errors.startDate.message}</span>
        ) : (
          <label htmlFor="startDate">{t("startDate", { ns: "coupon" })}</label>
        )}
        <input
          {...register("startDate")}
          name="startDate"
          type="datetime-local"
          placeholder={t("startDate", { ns: "coupon" })}
        />

        {errors?.endDate ? (
          <span>{errors.endDate.message}</span>
        ) : (
          <label htmlFor="endDate">{t("endDate", { ns: "coupon" })}</label>
        )}
        <input
          {...register("endDate")}
          name="endDate"
          type="datetime-local"
          placeholder={t("endDate", { ns: "coupon" })}
        />

        {errors?.image ? (
          <span>{errors.image.message}</span>
        ) : (
          <label htmlFor="image">
            {t("image", { ns: "coupon" })}
          </label>
        )}
        <input
          {...register("image")}
          name="image"
          type="text"
          placeholder={t("image", { ns: "coupon" })}
        />

        <button disabled={!isValid || isSubmitting}>
          {t("add", { ns: "coupon" })}
        </button>
      </form>
    </div>
  );
}

export default AddCoupon;
