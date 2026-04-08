import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

import { useCreateUser } from "../features/users/useCreateUser";
import { useUpdateUser } from "../features/users/useUpdateUser";
import { useDeleteUser } from "../features/users/UseDeleteUser";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const limit = 5;

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  // 🔥 Initial loading
  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading users</div>;
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Create User
        </button>
      </div>

      {/* 🔥 Page transition loading */}
      {isFetching && <p className="text-sm text-gray-500 mb-2">Loading...</p>}

      {/* USERS LIST */}
      <div className="space-y-4">
        {data.data.length === 0 && (
          <p className="text-gray-500">No users found</p>
        )}

        {data.data.map((user: any) => (
          <div
            key={user.id}
            className="flex items-center justify-between border p-4 rounded shadow-sm bg-white"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
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

            {/* RIGHT SIDE (ACTIONS) */}
            <div className="flex gap-3">
              {/* EDIT */}
              <button
                onClick={() => {
                  setEditingUser(user);
                  setOpen(true);
                }}
                className="text-blue-500 hover:underline cursor-pointer"
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
                className="text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        <span className="text-sm">Page {page}</span>

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          defaultValues={editingUser || {}}
          onSubmit={(formData) => {
            const cleaned = Object.fromEntries(
              Object.entries(formData).filter(([_, v]) => v !== ""),
            );

            const finalData = {
              ...cleaned,
              avatar:
                cleaned.avatar ||
                `https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg`,
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
