import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  updateUserSchema,
} from "../features/users/user.schema";

export default function UserForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}) {
  const isEdit = !!defaultValues && Object.keys(defaultValues).length > 0;

  const form = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues,
  });

  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        placeholder="Email"
        {...register("email")}
        className="border p-2 w-full"
      />

      {/* 🔥 Password only in CREATE */}
      {!isEdit && (
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
          className="border p-2 w-full"
        />
      )}

      <input
        placeholder="First Name"
        {...register("firstName")}
        className="border p-2 w-full"
      />

      <input
        placeholder="Last Name"
        {...register("lastName")}
        className="border p-2 w-full"
      />

      <input
        placeholder="Job Title"
        {...register("jobTitle")}
        className="border p-2 w-full"
      />

      <input
        placeholder="Avatar URL"
        {...register("avatar")}
        className="border p-2 w-full"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer">
        {isEdit ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
