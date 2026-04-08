import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

import { useCreateUser } from "../features/users/useCreateUser";
import { useUpdateUser } from "../features/users/useUpdateUser";
import { useDeleteUser } from "../features/users/UseDeleteUser";

import type { UserFormData } from "../types/user";
import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const limit = 5;

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  // Auto-hide success message after 3 seconds
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-gray-100 font-mono flex items-center justify-center">
        <div className="text-sm">
          <span className="text-gray-500">$</span> loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono p-6">
      <div className="max-w-4xl mx-auto">
        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="mb-4 p-3 border border-green-900 bg-green-950/30 rounded animate-fade-in">
            <p className="text-xs text-green-400">
              <span className="text-green-500">SUCCESS:</span> {successMessage}
            </p>
          </div>
        )}

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-900">
          <div>
            <h2 className="text-xl font-normal mb-1">
              <span className="text-gray-500">$</span> users
            </h2>
            <p className="text-xs text-gray-600">{data?.total || 0} records</p>
          </div>
          <div className="flex items-center gap-3">
            <LogoutButton />
            <button
              onClick={() => {
                setEditingUser(null);
                setOpen(true);
              }}
              className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              + new
            </button>
          </div>
        </div>

        {/* LOADING INDICATOR
        {isFetching && (
          <div className="text-xs text-gray-600 mb-4">
            <span className="text-gray-700">//</span> fetching...
          </div>
        )} */}

        {/* USERS LIST */}
        <div className="space-y-2 min-h-[400px]">
          {data?.data.length === 0 && (
            <div className="text-center py-12 text-gray-600 text-sm">
              <span className="text-gray-700">//</span> no users found
            </div>
          )}

          {data?.data.map((user: any, index: number) => (
            <div
              key={user.id}
              className="border border-gray-900 rounded p-4 hover:border-gray-800 transition-colors group"
            >
              <div className="flex justify-between items-start">
                {/* LEFT */}
                <div className="flex gap-4 items-start flex-1">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded border border-gray-800 object-cover bg-gray-900"
                    />
                    <span className="absolute -top-1 -left-1 text-[10px] text-gray-700">
                      [{index + 1 + (page - 1) * limit}]
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-sm mb-0.5">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      <span className="text-gray-700">role:</span>{" "}
                      {user.jobTitle}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setOpen(true);
                    }}
                    disabled={updateUser.isPending}
                    className="px-3 py-1 text-xs border border-gray-800 rounded hover:border-gray-600 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      if (confirm("Are you sure?")) {
                        deleteUser.mutate(user.id, {
                          onSuccess: () => {
                            showSuccess("User deleted successfully");
                          },
                        });
                      }
                    }}
                    disabled={deleteUser.isPending}
                    className="px-3 py-1 text-xs border border-gray-800 rounded hover:border-red-900 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {deleteUser.isPending ? "..." : "delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-900 cursor-pointer">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs border border-gray-800 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-gray-600 transition-colors cursor-pointer"
          >
            ← prev
          </button>

          <span className="text-xs text-gray-600">
            page <span className="text-gray-400">{page}</span> of{" "}
            <span className="text-gray-400">{data?.totalPages || 1}</span>
          </span>

          <button
            disabled={page === data?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs border border-gray-800 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-gray-600 transition-colors cursor-pointer"
          >
            next →
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          defaultValues={editingUser || {}}
          onSubmit={async (formData: UserFormData) => {
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

            try {
              if (editingUser) {
                await updateUser.mutateAsync({
                  id: editingUser.id,
                  data: finalData,
                });
                showSuccess("User updated successfully");
              } else {
                await createUser.mutateAsync(finalData);
                showSuccess("User created successfully");
              }
              setOpen(false);
            } catch (error) {
              // Error will be caught and displayed by UserForm
              throw error;
            }
          }}
        />
      </Modal>
    </div>
  );
}
