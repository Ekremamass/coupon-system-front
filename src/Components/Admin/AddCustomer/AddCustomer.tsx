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

function AddCustomer(): JSX.Element {
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
        notifyService.success("Added successfully");
        dispatch(addedCustomerAction(res.data));
        navigate("/admin/customers");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCustomer">
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

        <button disabled={!isValid || isSubmitting}>Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
