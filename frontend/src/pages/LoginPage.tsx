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
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-normal mb-1">
            <span className="text-gray-500">$</span> login
          </h1>
          <p className="text-sm text-gray-600">authenticate to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-500 mb-1.5"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="dev@domain.com"
              {...register("email")}
              className="w-full px-3 py-2.5 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-500 mb-1.5"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-3 py-2.5 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-2.5 px-4 rounded text-sm hover:bg-gray-200 transition-colors mt-6"
          >
            Sign in →
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-900">
          <p className="text-xs text-gray-600">
            <span className="text-gray-700">//</span> no account?{" "}
            <a
              href="#"
              className="text-gray-400 hover:text-gray-100 underline underline-offset-2 transition-colors"
            >
              request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
