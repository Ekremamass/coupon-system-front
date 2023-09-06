import { useNavigate } from "react-router-dom";
import "./RegisterCompany.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { RegisterCompanyDetails } from "../../../Models/Register";
import { CompanyModel } from "../../../Models/Company";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function RegisterCompany(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmShown, setConfirmShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirm = () => {
    setConfirmShown(!confirmShown);
  };
  const schema = zod
    .object({
      name: zod.string().nonempty("Name is required"),
      email: zod.string().email(),
      password: zod.string().min(4),
      confirm: zod.string().min(4),
    })
    .refine((value) => value.password === value.confirm, {
      message: "Passwords must match",
      path: ["confirm"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterCompanyDetails>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterCompanyDetails> = (
    data: RegisterCompanyDetails
  ) => {
    const reqBody = {
      name: data.name,
      email: data.email,
      password: data.password,
    } as CompanyModel;

    return webApiService
      .registerCompany(reqBody)
      .then(() => {
        notifyService.success(t("registered", { ns: "messages" }));
        navigate("/login");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="RegisterCompany">
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
        <div className="row">
          <input
            {...register("password")}
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder={t("password", { ns: "login" })}
          />
          <button type="button" onClick={togglePassword}>{!passwordShown ? t("show", { ns: "login" }):  t("hide", { ns: "login" })}</button>
        </div>

        {errors?.confirm ? (
          <span>{errors.confirm.message}</span>
        ) : (
          <label htmlFor="confirm">{t("confirm", { ns: "login" })}</label>
        )}
        <div className="row">
          <input
            {...register("confirm")}
            name="confirm"
            type={confirmShown ? "text" : "password"}
            placeholder={t("confirm", { ns: "login" })}
          />
          <button type="button" onClick={toggleConfirm}>{!confirmShown ? t("show", { ns: "login" }):  t("hide", { ns: "login" })}</button>
        </div>

        <button disabled={!isValid || isSubmitting}>
          {t("register", { ns: "login" })}
        </button>
      </form>
    </div>
  );
}

export default RegisterCompany;
