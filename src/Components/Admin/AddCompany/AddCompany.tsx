import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { CompanyModel } from "../../../Models/Company";
import { useDispatch } from "react-redux";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = zod.object({
    name: zod.string().nonempty("Name is required"),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompanyModel>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    return webApiService
      .addCompany(data)
      .then((res) => {
        console.log(res);
        dispatch(addedCompanyAction(res.data));
        notifyService.success("Added successfully");
        navigate("/admin/companies");
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddCompany">
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

        <button disabled={!isValid || isSubmitting}>Add Company</button>
      </form>
    </div>
  );
}

export default AddCompany;
