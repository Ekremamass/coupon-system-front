import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginReqModel } from "../../../Models/Login";
import { userLoggedIn } from "../../../Redux/AuthAppState";
import notifyService from "../../../Services/NotificationService";
import webApiService from "../../../Services/WebApiService";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Login(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const schema = zod.object({
    email: zod.string().email("Invalid email").nonempty("Email is required"),
    password: zod
      .string()
      .min(4, "Password must be at least 4 characters")
      .nonempty("Password is required"),
    clientType: zod.enum(["ADMINISTRATOR", "COMPANY", "CUSTOMER"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {
    return webApiService
      .login(data)
      .then((res) => {
        dispatch(userLoggedIn(res.data));
        notifyService.success(t("logged_in", { ns: "login" }));
        navigate("/home");
      })
      .catch((err) => {
        notifyService.error(err);
      });
  };
  return (
    <div className="Login form-look-and-feel">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {errors?.clientType ? (
          <span>{errors.clientType.message}</span>
        ) : (
          <label htmlFor="clientType">{t("client", { ns: "login" })}</label>
        )}
        <select {...register("clientType")}>
          <option value="ADMINISTRATOR">{t("admin", { ns: "login" })}</option>
          <option value="COMPANY">{t("company", { ns: "login" })}</option>
          <option value="CUSTOMER">{t("customer", { ns: "login" })}</option>
        </select>

        <button disabled={!isValid || isSubmitting}>
          {t("login", { ns: "login" })}
        </button>
      </form>
    </div>
  );
}

export default Login;
