import axios from "axios";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const RegistationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
        formData
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message} `,
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      >
        <Field label="First Name" error={errors?.firstName}>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            name="firstName"
            id="firstName"
            className={`auth-input border ${
              errors?.firstName ? "border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Last Name" error={errors?.lastName}>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            type="text"
            name="lastName"
            id="lastName"
            className={`auth-input border ${
              errors?.lastName ? "border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Email" error={errors?.email}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            id="name"
            className={`auth-input border ${
              errors?.email ? "border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Password" error={errors?.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 0,
                message: "Your Password must be at least 8 characters",
              },
            })}
            type="password"
            name="password"
            id="password"
            className={`auth-input border ${
              errors?.password ? "border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <p>{errors?.root?.random?.message}</p>
        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-white border transition-all hover:opacity-90"
            type="submit"
          >
            Register
          </button>
        </Field>
      </form>
    </>
  );
};

export default RegistationForm;
