import { useNavigate } from "react-router-dom";
import "./RegisterCompany.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { RegisterCompanyDetails } from "../../../Models/Register";
import { CompanyModel } from "../../../Models/Company";

function RegisterCompany(): JSX.Element {
  const navigate = useNavigate();

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
        notifyService.success("Registered successfully")
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
          <label htmlFor="name">Name</label>
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

export default RegisterCompany;