import "./RegisterCustomer.css";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { RegisterCustomerDetails } from "../../../Models/Register";
import { CustomerModel } from "../../../Models/Customer";

function RegisterCustomer(): JSX.Element {
  const navigate = useNavigate();

  const schema = zod
    .object({
      firstName: zod.string().nonempty("First name is required"),
      lastName: zod.string().nonempty("Last Name is required"),
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
  } = useForm<RegisterCustomerDetails>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterCustomerDetails> = (
    data: RegisterCustomerDetails
  ) => {
    const reqBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    } as CustomerModel;

    return webApiService
      .registerCustomer(reqBody)
      .then(() => {
        notifyService.success("Registered successfully")
        navigate("/login");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="RegisterCompany">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {errors?.confirm ? (
          <span>{errors.confirm.message}</span>
        ) : (
          <label htmlFor="confirm">Confirm Password</label>
        )}
        <input
          {...register("confirm")}
          name="confirm"
          type="password"
          placeholder="Confirm password..."
        />
        <button disabled={!isValid || isSubmitting}>Register</button>
      </form>
    </div>
  );
}

export default RegisterCustomer;
