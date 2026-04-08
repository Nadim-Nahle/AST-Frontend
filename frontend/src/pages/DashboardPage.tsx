import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fetchUsers } from "../api/users";

import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

import { useCreateUser } from "../features/users/useCreateUser";
import { useUpdateUser } from "../features/users/useUpdateUser";
import { useDeleteUser } from "../features/users/UseDeleteUser";

import type { UserFormData } from "../types/user";

// ✅ NEW COMPONENTS
import DashboardHeader from "../components/dashboard/DashboardHeader";
import UsersList from "../components/dashboard/UserList";
import Pagination from "../components/dashboard/Pagination";
import SuccessMessage from "../components/dashboard/SuccessMessage";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 5;

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // 🔥 LOADING SCREEN
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
        {/* ✅ SUCCESS MESSAGE */}
        <SuccessMessage message={successMessage || ""} />

        {/* ✅ HEADER */}
        <DashboardHeader
          total={data?.total || 0}
          onCreate={() => {
            setEditingUser(null);
            setOpen(true);
          }}
        />

        {/* ✅ USERS LIST */}
        <UsersList
          users={data?.data || []}
          page={page}
          limit={limit}
          isFetching={isFetching}
          deleting={deleteUser.isPending}
          onEdit={(user) => {
            setEditingUser(user);
            setOpen(true);
          }}
          onDelete={(id) => {
            if (confirm("Are you sure?")) {
              deleteUser.mutate(id, {
                onSuccess: () => {
                  showSuccess("User deleted successfully");
                },
              });
            }
          }}
        />

        {/* ✅ PAGINATION */}
        <Pagination
          page={page}
          totalPages={data?.totalPages || 1}
          onChange={handlePageChange}
        />
      </div>

      {/* ✅ MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          defaultValues={editingUser || {}}
          onSubmit={async (formData: UserFormData) => {
            // remove empty fields
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
              throw error;
            }
          }}
        />
      </Modal>
    </div>
  );
}
