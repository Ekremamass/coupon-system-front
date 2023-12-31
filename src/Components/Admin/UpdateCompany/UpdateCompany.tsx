import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import store from "./../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { updatedCompanyAction } from "../../../Redux/CompanyAppState";
import { useTranslation } from "react-i18next";

function UpdateCompany(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const [obj] = useState<CompanyModel>(
    store.getState().companiesReducer.companies.filter((c) => c.id === id)[0]
  );

  const defaultValuesObj = { ...obj }; //Spread Operator

  const schema = zod.object({
    id: zod.number(),
    name: zod.string().nonempty("Name is required"),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompanyModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    return webApiService
      .updateCompany(id, data)
      .then(() => {
        notifyService.success(`${t("updated_comp", { ns: "messages" })}${id}`);
        dispatch(updatedCompanyAction(data));
        navigate("/admin/companies");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="UpdateCompany form-look-and-feel">
      <h2>{t("edit", { ns: "company" })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">Id</label>
        <input
          {...register("id")}
          name="id"
          type="text"
          value={obj.id}
          disabled={true}
        />

        {errors?.name ? (
          <span>{errors.name.message}</span>
        ) : (
          <label htmlFor="name">{t("name", { ns: "company" })}</label>
        )}
        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder="name..."
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
          placeholder="Email..."
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
          placeholder="Password..."
        />

        <button disabled={!isValid || isSubmitting}>
          {t("update", { ns: "company" })}
        </button>
      </form>
    </div>
  );
}

export default UpdateCompany;
