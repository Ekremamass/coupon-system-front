import "./GetCustomer.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import webApiService from "../../../Services/WebApiService";
import { useState } from "react";
import notifyService from "../../../Services/NotificationService";
import * as zod from "zod";
import { CustomerModel } from "../../../Models/Customer";
import CustomerCard from "../../Cards/CustomerCard/CustomerCard";
import { useTranslation } from "react-i18next";

function GetCustomer(): JSX.Element {
  const {t} = useTranslation();
  const [customer, setCustomer] = useState<CustomerModel>();

  const schema = zod.object({
    id: zod.number().positive("id must be a positive number"),
    // id: zod.string().nonempty("id must be a positive number"),
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

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    webApiService
      .getOneCustomer(data.id)
      .then((res) => {
        notifyService.success(t('got_cus',{ns:'messages'}) + data.id);
        setCustomer(res.data);
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="GetCustomer">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.id ? (
          <span>{errors.id.message}</span>
        ) : (
          <label htmlFor="id">{t('id')}</label>
        )}
        <input
          {...register("id", { valueAsNumber: true })}
          name="id"
          type="number"
        />
        <button disabled={!isValid || isSubmitting}>{t('find',{ns:'customer'})}</button>
      </form>
      <br />
      {customer !== undefined ? <CustomerCard customer={customer} /> : <></>}
    </div>
  );
}

export default GetCustomer;
