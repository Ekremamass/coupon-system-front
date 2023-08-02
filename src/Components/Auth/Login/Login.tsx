import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginReqModel } from "../../../Models/Login";
import { userLoggedIn } from "../../../Redux/AuthAppState";
import notifyService from "../../../Services/NotificationService";
import webApiService from "../../../Services/WebApiService";

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/home");
      })
      .catch((err) => {
        notifyService.error(err);
      });
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {errors?.clientType ? (
          <span>{errors.clientType.message}</span>
        ) : (
          <label htmlFor="clientType">Client type</label>
        )}
        <select {...register("clientType")}>
          <option value="ADMINISTRATOR">Admin</option>
          <option value="COMPANY">Company</option>
          <option value="CUSTOMER">Customer</option>
        </select>

        <button disabled={!isValid || isSubmitting}>Login</button>
      </form>
    </div>
  );
}

export default Login;
