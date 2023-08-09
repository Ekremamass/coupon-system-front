import "./GetCompany.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import webApiService from "../../../Services/WebApiService";
import { useState } from "react";
import notifyService from "../../../Services/NotificationService";
import * as zod from "zod";
import { CompanyModel } from "../../../Models/Company";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";

function GetCompany(): JSX.Element {
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
      notifyService.success("got company #"+data.id);
      setCompany(res.data);
    })
    .catch((err)=>notifyService.error(err));
  }

  return (
    <div className="GetCompany">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <label htmlFor="id">id</label>
        )}
        <input {...register("id", { valueAsNumber: true })} name="id" type="number" />
        <button disabled={!isValid || isSubmitting}>Find Company</button>
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
