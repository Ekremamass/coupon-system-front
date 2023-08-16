import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { CompanyModel } from "../../../Models/Company";
import { useDispatch } from "react-redux";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import { useTranslation } from "react-i18next";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const schema = zod.object({
    name: zod.string().nonempty("Name is required"),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompanyModel>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    return webApiService
      .addCompany(data)
      .then((res) => {
        console.log(res);
        dispatch(addedCompanyAction(res.data));
        notifyService.success(t("added", { ns: "messages" }));
        navigate("/admin/companies");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCompany">
      <h2>{t("add", { ns: "company" })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.name ? (
          <span>{errors.name.message}</span>
        ) : (
          <label htmlFor="name">{t("name", { ns: "company" })}</label>
        )}
        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder={t("name", { ns: "company" })}
        />

        {errors?.email ? (
          <span>{errors.email.message}</span>
        ) : (
          <label htmlFor="email">{t("email", { ns: "login" })}</label>
        )}
        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder={t("email", { ns: "login" })}
        />

        {errors?.password ? (
          <span>{errors.password.message}</span>
        ) : (
          <label htmlFor="password">{t("password", { ns: "login" })}</label>
        )}
        <input
          {...register("password")}
          name="password"
          type="password"
          placeholder={t("password", { ns: "login" })}
        />

        <button disabled={!isValid || isSubmitting}>
          {t("add", { ns: "company" })}
        </button>
      </form>
    </div>
  );
}

export default AddCompany;
