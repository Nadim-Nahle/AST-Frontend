import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/login", data);

      login(res.data.token);
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <input placeholder="Password" type="password" {...register("password")} />
      <button type="submit">Login</button>
    </form>
  );
}
