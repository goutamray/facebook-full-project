import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import Field from "../common/Field";

import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          const authToken = token?.token;
          const refreshToken = token.refreshToken;

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User with email not Found : ${error.message}`,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      >
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
            Login
          </button>
        </Field>
      </form>
    </div>
  );
};

export default LoginForm;
