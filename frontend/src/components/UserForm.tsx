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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full rounded"
      />

      {/* 🔥 Password ONLY in create */}
      {!isEdit && (
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
        />
      )}

      <input
        {...register("firstName")}
        placeholder="First Name"
        className="border p-2 w-full rounded"
      />

      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="border p-2 w-full rounded"
      />

      <input
        {...register("jobTitle")}
        placeholder="Job Title"
        className="border p-2 w-full rounded"
      />

      <input
        {...register("avatar")}
        placeholder="Avatar URL (optional)"
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white w-full py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : isEdit ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
