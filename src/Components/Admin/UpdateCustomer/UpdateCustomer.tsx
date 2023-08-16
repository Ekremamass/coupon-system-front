import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import store from "./../../../Redux/Store";
import { CustomerModel } from "../../../Models/Customer";
import { updatedCustomerAction } from "../../../Redux/CustomerAppState";
import { useTranslation } from "react-i18next";

function UpdateCustomer(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const [obj] = useState<CustomerModel>(
    store.getState().customersReducer.customers.filter((c) => c.id === id)[0]
  );

  const defaultValuesObj = { ...obj }; //Spread Operator

  const schema = zod.object({
    id: zod.number(),
    firstName: zod.string().nonempty("First Name is required"),
    lastName: zod.string().nonempty("Last Name is required"),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CustomerModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
    console.log(data);
    console.log(id);
    return webApiService
      .updateCustomer(id, data)
      .then(() => {
        notifyService.success(`updated customer #${id}`);
        dispatch(updatedCustomerAction(data));
        navigate("/admin/customers");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="UpdateCustomer">
      <h2>{t("edit", { ns: "customer" })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">Id</label>
        <input
          {...register("id")}
          name="id"
          type="text"
          value={obj.id}
          disabled={true}
        />

        {errors?.firstName ? (
          <span>{errors.firstName.message}</span>
        ) : (
          <label htmlFor="firstName">First name</label>
        )}
        <input
          {...register("firstName")}
          name="firstName"
          type="text"
          placeholder="First Name..."
        />

        {errors?.lastName ? (
          <span>{errors.lastName.message}</span>
        ) : (
          <label htmlFor="lastName">Last name</label>
        )}
        <input
          {...register("lastName")}
          name="lastName"
          type="text"
          placeholder="Last name..."
        />

        {errors?.email ? (
          <span>{errors.email.message}</span>
        ) : (
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
        )}
        <input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Password..."
        />

        <button disabled={!isValid || isSubmitting}>Update Customer</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
