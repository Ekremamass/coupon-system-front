import { useTranslation } from "react-i18next";
import "./UpdateCoupon.css";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Category, CouponModel } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../Services/NotificationService";
import { updatedCouponAction } from "../../../Redux/CouponAppState";
import webApiService from "../../../Services/WebApiService";

function UpdateCoupon(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const [obj] = useState<CouponModel>(
    store.getState().couponsReducer.coupons.filter((c) => c.id === id)[0]
  );

  const defaultValuesObj = { ...obj }; //Spread Operator

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = z.object({
    title: z.string().min(5).max(50).optional(),
    category: z.string().nullable(),
    description: z.string().min(10).max(200).optional(),
    amount: z.number().min(0).optional(),
    price: z.number().min(0).optional(),
    startDate: z
      .string()
      .transform((dateString, ctx) => {
        const date = new Date(dateString);
        if (!z.date().safeParse(date).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
          });
        }
        return date;
      })
      .refine((startDate) => startDate >= today, {
        message: "Start date must be after or equal to today's date",
      }),
    endDate: z
      .string()
      .transform((dateString, ctx) => {
        const date = new Date(dateString);
        if (!z.date().safeParse(date).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
          });
        }
        return date;
      })
      .refine((endDate) => endDate >= today, {
        message: "End date must be after or equal to today's date",
      }),
    image: z.string().url().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CouponModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
    return webApiService
      .updateCoupon(id, data)
      .then(() => {
        notifyService.success(
          `${t("updated_coupon", { ns: "messages" })}${id}`
        );
        dispatch(updatedCouponAction(data));
        navigate("/company/coupons");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="UpdateCoupon">
      <h2>{t("edit", { ns: "coupon" })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">{t("id")}</label>
        <input
          {...register("id")}
          name="id"
          type="text"
          value={obj.id}
          disabled={true}
        />

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
          type="date"
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
          type="date"
          placeholder={t("endDate", { ns: "coupon" })}
        />

        {errors?.image ? (
          <span>{errors.image.message}</span>
        ) : (
          <label htmlFor="image">{t("image", { ns: "coupon" })}</label>
        )}
        <input
          {...register("image")}
          name="image"
          type="text"
          placeholder={t("image", { ns: "coupon" })}
        />

        <button disabled={!isValid || isSubmitting}>
          {t("update", { ns: "coupon" })}
        </button>
      </form>
    </div>
  );
}

export default UpdateCoupon;
