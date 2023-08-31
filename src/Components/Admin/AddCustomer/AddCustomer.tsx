import "./AddCustomer.css";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { CustomerModel } from "../../../Models/Customer";
import { useDispatch } from "react-redux";
import { addedCustomerAction } from "../../../Redux/CustomerAppState";
import { useTranslation } from "react-i18next";

function AddCustomer(): JSX.Element {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = zod.object({
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string().nonempty("Last Name is required"),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CustomerModel>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
    return webApiService
      .addCustomer(data)
      .then((res) => {
        notifyService.success(t('added', { ns: 'messages' }));
        dispatch(addedCustomerAction(res.data));
        navigate("/admin/customers");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCustomer form-look-and-feel">
      <h2>{t('add', { ns: 'customer' })}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.firstName ? (
          <span>{errors.firstName.message}</span>
        ) : (
          <label htmlFor="firstName">{t('first', { ns: 'customer' })}</label>
        )}
        <input
          {...register("firstName")}
          name="firstName"
          type="text"
          placeholder={t('first', { ns: 'customer' })}
        />

        {errors?.lastName ? (
          <span>{errors.lastName.message}</span>
        ) : (
          <label htmlFor="lastName">{t('last', { ns: 'customer' })}</label>
        )}
        <input
          {...register("lastName")}
          name="lastName"
          type="text"
          placeholder={t('last', { ns: 'customer' })}
        />

        {errors?.email ? (
          <span>{errors.email.message}</span>
        ) : (
          <label htmlFor="email">{t('email', { ns: 'login' })}</label>
        )}
        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder={t('email', { ns: 'login' })}
        />

        {errors?.password ? (
          <span>{errors.password.message}</span>
        ) : (
          <label htmlFor="password">{t('password', { ns: 'login' })}</label>
        )}
        <input
          {...register("password")}
          name="password"
          type="password"
          placeholder={t('password', { ns: 'login' })}
        />

        <button disabled={!isValid || isSubmitting}>{t('add', { ns: 'customer' })}</button>
      </form>
    </div>
  );
}

export default AddCustomer;
