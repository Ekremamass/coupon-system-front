import "./GetCompany.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import webApiService from "../../../Services/WebApiService";
import { useState } from "react";
import notifyService from "../../../Services/NotificationService";
import * as zod from "zod";
import { CompanyModel } from "../../../Models/Company";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";
import { useTranslation } from "react-i18next";

function GetCompany(): JSX.Element {
  const {t} = useTranslation();
  const [company, setCompany] = useState<CompanyModel>();

  const schema = zod.object({
    id: zod.number().positive("id must be a positive number"),
  });

  type FormData = {
    id: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit : SubmitHandler<FormData>= (data: FormData) => {
    webApiService.getOneCompany(data.id)
    .then((res) => {
      notifyService.success(t('got_comp',{ns:'messages'})+data.id);
      setCompany(res.data);
    })
    .catch((err)=>notifyService.error(err));
  }

  return (
    <div className="GetCompany form-look-and-feel">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <label htmlFor="id">{t('id')}</label>
        )}
        <input {...register("id", { valueAsNumber: true })} name="id" type="number" />
        <button disabled={!isValid || isSubmitting}>{t('find',{ns:'company'})}</button>
      </form>
      <br/>
      {company !== undefined ? (
         <CompanyCard company={company} />
        )
       : (
        <></>
      )}
    </div>
  );
}

export default GetCompany;
