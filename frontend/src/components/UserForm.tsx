import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserSchema,
  updateUserSchema,
} from "../features/users/user.schema";

import type { User } from "../types/user";

// 🔥 Use Partial<User> for flexibility
type UserFormData = Partial<User>;

export default function UserForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
}) {
  const isEdit = !!defaultValues && Object.keys(defaultValues).length > 0;
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: UserFormData) => {
    setError(null); // Clear previous errors

    try {
      await onSubmit(data);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Operation failed";
      setError(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 font-mono"
      noValidate
    >
      {/* Error Message */}
      {error && (
        <div className="p-3 border border-red-900 bg-red-950/30 rounded">
          <p className="text-xs text-red-400">
            <span className="text-red-500">ERROR:</span> {error}
          </p>
        </div>
      )}

      {/* Validation Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3 border border-yellow-900 bg-yellow-950/30 rounded">
          <p className="text-xs text-yellow-400 mb-1">
            <span className="text-yellow-500">VALIDATION:</span>
          </p>
          <ul className="text-xs text-yellow-400 space-y-0.5 ml-3">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <span className="text-yellow-600">•</span> {field}:{" "}
                {error?.message as string}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">EMAIL</label>
        <input
          {...register("email")}
          placeholder="dev@domain.com"
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Password ONLY in create */}
      {!isEdit && (
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">PASSWORD</label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
          />
        </div>
      )}

      {/* First Name */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">FIRST NAME</label>
        <input
          {...register("firstName")}
          placeholder="John"
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">LAST NAME</label>
        <input
          {...register("lastName")}
          placeholder="Doe"
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">JOB TITLE</label>
        <input
          {...register("jobTitle")}
          placeholder="Software Engineer"
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5">
          AVATAR URL <span className="text-gray-700">// optional</span>
        </label>
        <input
          {...register("avatar")}
          placeholder="https://..."
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-700 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black font-medium py-2.5 px-4 rounded text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isSubmitting ? "saving..." : isEdit ? "update →" : "create →"}
      </button>
    </form>
  );
}
