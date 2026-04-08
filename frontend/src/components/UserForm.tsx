import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../features/users/user.schema";
import type { UserFormData } from "../features/users/user.schema";

export default function UserForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
}) {
  const { register, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <input placeholder="Password" type="password" {...register("password")} />
      <input placeholder="First Name" {...register("firstName")} />
      <input placeholder="Last Name" {...register("lastName")} />
      <input placeholder="Job Title" {...register("jobTitle")} />
      <input placeholder="Avatar URL" {...register("avatar")} />

      <button type="submit">Submit</button>
    </form>
  );
}
