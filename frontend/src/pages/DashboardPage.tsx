import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

import { useCreateUser } from "../features/users/useCreateUser";
import { useUpdateUser } from "../features/users/useUpdateUser";
import { useDeleteUser } from "../features/users/UseDeleteUser";

import type { UserFormData } from "../types/user";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const limit = 5;

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users Dashboard</h2>

        <button
          onClick={() => {
            setEditingUser(null);
            setOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {/* LOADING ON PAGE CHANGE */}
      {isFetching && <p className="text-sm text-gray-500 mb-2">Loading...</p>}

      {/* USERS LIST */}
      <div className="space-y-4">
        {data?.data.length === 0 && (
          <p className="text-gray-500 text-center">No users found</p>
        )}

        {data?.data.map((user: any) => (
          <div
            key={user.id}
            className="flex justify-between items-center border p-4 rounded shadow-sm bg-white"
          >
            {/* LEFT */}
            <div className="flex gap-4 items-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm">{user.jobTitle}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {/* EDIT */}
              <button
                onClick={() => {
                  setEditingUser(user);
                  setOpen(true);
                }}
                disabled={updateUser.isPending}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 cursor-pointer disabled:opacity-50"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteUser.mutate(user.id);
                  }
                }}
                disabled={deleteUser.isPending}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer disabled:opacity-50"
              >
                {deleteUser.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-6 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">Page {page}</span>

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          defaultValues={editingUser || {}}
          onSubmit={(formData: UserFormData) => {
            // 🔥 remove empty fields
            const cleaned = Object.fromEntries(
              Object.entries(formData).filter(([_, v]) => v !== ""),
            );

            const finalData = {
              ...cleaned,
              avatar:
                cleaned.avatar ||
                `https://i.pravatar.cc/150?u=${cleaned.email}`,
            };

            if (editingUser) {
              updateUser.mutate({
                id: editingUser.id,
                data: finalData,
              });
            } else {
              createUser.mutate(finalData);
            }

            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
